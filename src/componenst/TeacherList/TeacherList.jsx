import { useEffect, useState } from "react";
import { Teacher } from "../Teacher/teacher";
import style from "./TeachersList.module.scss";

import { ref, get  } from "firebase/database";
import { database } from "../../firebase";

const getTeachers = async () => {
  try {
    const snapshot = await get(ref(database, "teachers"));
    if (snapshot.exists()) {
      const data = snapshot.val();
      // перетворення об'єкта у масив
      return Object.values(data);
    } else {
      console.log("Дані відсутні");
      return [];
    }
  } catch (error) {
    console.error("Помилка при отриманні даних:", error);
    return [];
  }
};



export const TeacherList = () => {
  const [languages, setLanguages] = useState([]);
  const [levels, setLevels] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);

  // Зберігаємо вибрані фільтри у стані
  const [filters, setFilters] = useState({
    language: "",
    level: "",
    price: "",
  });


  useEffect(() => {
    const fetchData = async () => {
      const data = await getTeachers();
      setFilteredTeachers(data);
    };
    fetchData();
  }, []);

  // useEffect(() => {
  //   const allLanguages = new Set();

  //   filteredTeachers.forEach((teacher) => {
  //     teacher.languages.forEach((lang) => {
  //       allLanguages.add(lang);
  //     });
  //   });

  //   setLanguages(Array.from(allLanguages));
  // }, []);

  // useEffect(() => {
  //   const uniqueLevels = Array.from(
  //     new Set(filteredTeachers.flatMap((teacher) => teacher.levels))
  //   );
  //   setLevels(uniqueLevels);
  // }, []);

  // useEffect(() => {
  //   // Фільтрація при зміні filters
  //   let filtered = filteredTeachers;

  //   if (filters.language) {
  //     filtered = filtered.filter((teacher) =>
  //       teacher.languages
  //         .map((lang) => lang.toLowerCase())
  //         .includes(filters.language)
  //     );
  //   }

  //   if (filters.level) {
  //     filtered = filtered.filter((teacher) =>
  //       teacher.levels
  //         .map((level) => level.toLowerCase())
  //         .includes(filters.level)
  //     );
  //   }

  //   if (filters.price) {
  //     filtered = filtered.filter(
  //       (teacher) => teacher.price_per_hour <= parseInt(filters.price, 10)
  //     );
  //   }

  //   setFilteredTeachers(filtered);
  // }, [filters]);

  // const handleSetFilters = (e) => {
  //   const { name, value } = e.target;
  //   setFilters((prev) => ({
  //     ...prev,
  //     [name]: value.toLowerCase(),
  //   }));
  // };

  return (
    <div className={style.listWrapper}>
      {/* <div className={style.filters}>
        <label htmlFor="language" className={style.label}>
          Languages
          <select
            name="language"
            id="language"
            onChange={handleSetFilters}
            value={filters.language}
          >
            <option value="">All languages</option>
            {languages.map((language) => (
              <option key={language} value={language.toLowerCase()}>
                {language}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="level" className={style.label}>
          Level of knowledge
          <select
            name="level"
            id="level"
            onChange={handleSetFilters}
            value={filters.level}
          >
            <option value="">All levels</option>
            {levels.map((level) => (
              <option key={level} value={level.toLowerCase()}>
                {level}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="price" className={style.label}>
          Price
          <select
            name="price"
            id="price"
            onChange={handleSetFilters}
            value={filters.price}
          >
            <option value="">No price filter</option>
            <option value="25">25$</option>
            <option value="30">30$</option>
            <option value="35">35$</option>
            <option value="40">40$</option>
          </select>
        </label>
      </div> */}

      <ul className={style.list}>
        {filteredTeachers.length > 0 ? (
          filteredTeachers.map((teacher) => (
            <li key={teacher.name + teacher.surname}>
              <Teacher teacher={teacher} />
            </li>
          ))
        ) : (
          <p>No teachers match the selected filters.</p>
        )}
      </ul>
    </div>
  );
};
