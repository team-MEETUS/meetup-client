import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useGetAllGeoData } from '@/apis/react-query/common/useGeo';
import { GetAllGeoAPIResponseBody } from '@/apis/server/common/geoAPI';
import LoadingSpinner from '@/components/common/loading-spinner/LoadingSpinner';
import CommonHeader from '@/components/header/CommonHeader';
import { debounce } from '@/utils/debounce';

import styles from './MeetingRegisterLocation.module.scss';

const MeetingRegisterLocation = () => {
  const { GetAllGeoData, isLoading } = useGetAllGeoData();
  const [search, setSearch] = useState<string>('');
  const [filteredData, setFilteredData] = useState<GetAllGeoAPIResponseBody[]>(
    [],
  );

  const navigate = useNavigate();

  const debounceFilter = debounce((searchTerm: string) => {
    if (searchTerm === '' && GetAllGeoData) {
      setFilteredData([]);
    } else {
      const lowerCaseSearch = searchTerm.toLowerCase();
      const filtered =
        GetAllGeoData &&
        GetAllGeoData.filter(
          (item) =>
            item.city.toLowerCase().includes(lowerCaseSearch) ||
            item.district.toLowerCase().includes(lowerCaseSearch) ||
            item.county.toLowerCase().includes(lowerCaseSearch),
        );

      setFilteredData(filtered || []);
    }
  }, 500);

  useEffect(() => {
    debounceFilter(search);
  }, [search, GetAllGeoData, debounceFilter]);

  const handleSelectLocation = (location: string, geoId: number) => {
    navigate('/meeting/register', {
      state: { selectedLocation: location, geoId },
    });
  };

  if (isLoading)
    return (
      <div>
        <LoadingSpinner />
      </div>
    );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <CommonHeader title="모임 지역" />
      </div>
      <div className={styles.search}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="동 · 읍 · 면을 입력해주세요."
          className={styles.search_input}
        />
      </div>
      {search && (
        <div className={styles.result}>
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <div
                key={item.geoId}
                onClick={() =>
                  handleSelectLocation(
                    `${item.city} ${item.district}`,
                    item.geoId,
                  )
                }
                className={styles.result_item}
              >
                <span className={styles.item_left}>{item.county}</span>
                <span
                  className={styles.item_right}
                >{` (${item.city} ${item.district})`}</span>
              </div>
            ))
          ) : (
            <div className={styles.no_result}>검색 결과가 없습니다.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default MeetingRegisterLocation;
