import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';

import { useSearchCrewListQuery } from '@/apis/react-query/crew/useHomeQuery';
import BackArrowIcon from '@/assets/icons/BackArrowIcon.svg?react';
import SearchIcon from '@/assets/icons/SearchIcon.svg?react';
import CrewCard from '@/components/common/crew-card/CrewCard';

import styles from './SearchPage.module.scss';

const SearchPage = () => {
  const navigate = useNavigate();
  const cn = classNames.bind(styles);
  const [searchText, setSearchText] = useState<string>('');
  const [recentSearch, setRecentSearch] = useState<string[]>([]); // 초기 상태를 string 배열로 설정
  const [searchQuery, setSearchQuery] = useState<string>('');

  const { data: searchCrewList } = useSearchCrewListQuery(searchQuery);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = () => {
    if (searchText.trim() !== '') {
      const updatedSearches = [
        searchText,
        ...recentSearch.filter((item) => item !== searchText),
      ];

      localStorage.setItem('SEARCH_TEXT', JSON.stringify(updatedSearches));
      setRecentSearch(updatedSearches);
      setSearchQuery(searchText); // 검색어 업데이트
    }
  };

  const handleDeleteSearch = (searchToDelete: string) => {
    const updatedSearches = recentSearch.filter(
      (search) => search !== searchToDelete,
    );
    setRecentSearch(updatedSearches);
    localStorage.setItem('SEARCH_TEXT', JSON.stringify(updatedSearches));
  };

  const handleRecentSearchClick = (search: string) => {
    setSearchText(search);
    setSearchQuery(search);

    // 배열의 순서를 클릭한 검색어가 맨 앞으로 오도록 변경
    const updatedSearches = [
      search,
      ...recentSearch.filter((item) => item !== search),
    ];
    setRecentSearch(updatedSearches);
    localStorage.setItem('SEARCH_TEXT', JSON.stringify(updatedSearches));
  };

  useEffect(() => {
    const savedSearches = localStorage.getItem('SEARCH_TEXT');
    if (savedSearches) {
      try {
        const parsedSearches = JSON.parse(savedSearches) as string[];
        if (Array.isArray(parsedSearches)) {
          setRecentSearch(parsedSearches);
        }
      } catch (error) {
        console.error('Error parsing recent searches:', error);
        setRecentSearch([]);
      }
    }
  }, []);

  // 최대 5개만 보이도록 설정
  const visibleItems = recentSearch.slice(0, 5);

  return (
    <div className={cn('container')}>
      <div className={cn('header')}>
        <div className={cn('search_container')}>
          <BackArrowIcon onClick={() => navigate('/')} />
          <input
            className={cn('search_input')}
            type="text"
            placeholder="모임명 검색"
            value={searchText}
            onKeyDown={handleKeyDown}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <SearchIcon className={cn('search_icon')} onClick={handleSearch} />
        </div>

        {/* 최근 검색어 */}
        <div className={cn('recent_container')}>
          <span className={cn('recent_title')}>최근 검색어</span>
          <div className={cn('recent_list')}>
            {visibleItems.length > 0 &&
              visibleItems.map((item, index) => (
                <div key={index} className={cn('recent_item')}>
                  <button
                    className={cn('delete_button')}
                    onClick={() => handleDeleteSearch(item)}
                  >
                    ×
                  </button>
                  <span
                    className={cn('search_text')}
                    onClick={() => handleRecentSearchClick(item)}
                  >
                    {item}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className={cn('content')}>
        {searchCrewList &&
          searchCrewList.map((crew) => (
            <div key={crew.crewId}>
              <CrewCard crew={crew} />
              <hr className={cn('crew_hr')} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default SearchPage;
