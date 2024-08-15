import { useRef, useState } from 'react';

import { Editor } from '@tinymce/tinymce-react';
import classNames from 'classnames/bind';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Editor as TinyMCEEditor } from 'tinymce';

import { useCrewBoardMutation } from '@/apis/react-query/crew/useCrewBoardMutation';
import DropDown from '@/components/common/dropdown/DropDown';
import CommonHeader from '@/components/header/CommonHeader';
import { CrewState } from '@/types/crew/crewType';

import styles from './CrewBoardRegisterPage.module.scss';

const CrewBoardRegister = () => {
  const VITE_EDITOR_API_KEY = import.meta.env.VITE_EDITOR_API_KEY;

  const cn = classNames.bind(styles);
  const location = useLocation();
  const state = location.state as CrewState;

  const { PostCreateBoard, PostCreateBoardImage } = useCrewBoardMutation();

  // 드롭다운 옵션
  const categoryOptions = [
    { value: '공지', label: '공지' },
    { value: '가입인사', label: '가입인사' },
    { value: '모임후기', label: '모임후기' },
    { value: '자유', label: '자유' },
  ];

  const [crewId] = useState<string>(state.crewId || '');
  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<string>(categoryOptions[0].value);

  const editorRef = useRef<TinyMCEEditor | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

        const imageUrl = data?.data?.images?.[0];

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

  const handleCreateBoard = async () => {
    const body = {
      title,
      content: editorRef.current?.getContent() || '',
      category,
    };

    await PostCreateBoard.mutateAsync({
      crewId,
      body,
    });
  };

  return (
    <div className={cn('container')}>
      <div className={styles.header}>
        <CommonHeader
          title="게시글 작성"
          option="저장"
          onOptionClick={handleCreateBoard}
        />
      </div>
      <div className={cn('title')}>
        <input
          type="text"
          placeholder="Enter title here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <DropDown
          options={categoryOptions}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
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
        multiple={true}
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
