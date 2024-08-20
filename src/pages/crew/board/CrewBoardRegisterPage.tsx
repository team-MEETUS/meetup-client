import { useEffect, useRef, useState } from 'react';

import { Editor } from '@tinymce/tinymce-react';
import classNames from 'classnames/bind';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Editor as TinyMCEEditor } from 'tinymce';

import { useCrewBoardMutation } from '@/apis/react-query/crew/useCrewBoardMutation';
import { useCrewBoardDetailQuery } from '@/apis/react-query/crew/useCrewBoardQuery';
import DropDown from '@/components/common/dropdown/DropDown';
import CommonHeader from '@/components/header/CommonHeader';
import { CrewState } from '@/types/crew/crewType';

import styles from './CrewBoardRegisterPage.module.scss';

const CrewBoardRegister = () => {
  const VITE_EDITOR_API_KEY = import.meta.env.VITE_EDITOR_API_KEY;

  const cn = classNames.bind(styles);
  const location = useLocation();
  const state = location.state as CrewState;

  // 드롭다운 옵션
  const categoryOptions = [
    { value: '공지', label: '공지' },
    { value: '가입인사', label: '가입인사' },
    { value: '모임후기', label: '모임후기' },
    { value: '자유', label: '자유' },
  ];

  const [crewId] = useState<string>(state.crewId || '');
  const [boardId] = useState<string>(state.boardId || '');

  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<string>(categoryOptions[0].value);

  const editorRef = useRef<TinyMCEEditor | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { PostCreateBoard, PostCreateBoardImage, PutUpdateBoard } =
    useCrewBoardMutation();
  const { data: crewBoardDetailData } = useCrewBoardDetailQuery(
    crewId,
    boardId,
  );

  const onTriggerImage = () => {
    fileInputRef.current?.click();
  };

  // 이미지 업로드
  const onReadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const formData = new FormData();

      formData.append('images', file);

      try {
        // 이미지 업로드 API 호출
        const data = await PostCreateBoardImage.mutateAsync({
          crewId,
          images: formData,
        });

        const imageUrl = data?.data?.[0];

        if (imageUrl) {
          insertImg(imageUrl);
        } else {
          toast.error('이미지 URL을 불러올 수 없습니다.');
        }
      } catch {
        toast.error('이미지 업로드 중 오류 발생');
      }
    }
  };

  // 에디터에 이미지 삽입
  const insertImg = (imageSrc: string) => {
    if (editorRef.current) {
      editorRef.current.insertContent(
        `<img alt="photo" src="${imageSrc}" style="display: flex; flex:1; width: 100%; height: 300px; object-fit: contain;"/>`,
      );
    }
  };

  const handleSaveBoard = async () => {
    const body = {
      title,
      content: editorRef.current?.getContent() || '',
      category,
    };

    if (!title.trim()) {
      toast.error('제목은 필수 입력사항입니다.');
      return;
    }

    if (!body.content.trim()) {
      toast.error('본문은 필수 입력사항입니다.');
      return;
    }

    if (boardId) {
      // 수정 상태인 경우
      await PutUpdateBoard.mutateAsync({
        crewId,
        boardId,
        body,
      });
    } else {
      // 새 게시글 작성인 경우
      await PostCreateBoard.mutateAsync({
        crewId,
        body,
      });
    }
  };

  useEffect(() => {
    if (crewBoardDetailData) {
      setTitle(crewBoardDetailData.title);
      setCategory(crewBoardDetailData.category || categoryOptions[0].value);
      if (editorRef.current) {
        editorRef.current.setContent(crewBoardDetailData.content);
      }
    }
  }, [crewBoardDetailData]);

  return (
    <div className={cn('container')}>
      <div className={styles.header}>
        <CommonHeader
          title="게시글 작성"
          option="저장"
          onOptionClick={handleSaveBoard}
        />
      </div>
      <div className={cn('category')}>
        <DropDown
          options={categoryOptions}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>
      <div className={cn('title')}>
        <input
          type="text"
          placeholder="제목(20자)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <span className={cn('title_category')}>
          {category}
        </span>
      </div>
      <div className={cn('editor')}>
        <Editor
          apiKey={VITE_EDITOR_API_KEY}
          onInit={(_, editor: TinyMCEEditor) => (editorRef.current = editor)}
          initialValue=""
          init={{
            menubar: false,
            statusbar: false,
            toolbar: [
              { name: 'formatting', items: ['bold', 'italic'] },
              {
                name: 'alignment',
                items: [
                  'alignleft',
                  'aligncenter',
                  'alignright',
                  'alignjustify',
                ],
              },
              { name: 'custom_image', items: ['custom_image'] },
            ],
            setup: (editor: TinyMCEEditor) => {
              editor.ui.registry.addButton('custom_image', {
                icon: 'image',
                onAction: onTriggerImage,
              });
            },
          }}
        />
      </div>

      <input
        type="file"
        multiple={false}
        name="image"
        id="image"
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept="image/*"
        onChange={onReadImage}
      />
    </div>
  );
};

export default CrewBoardRegister;
