import { useEffect, useState } from "react";
import { Teacher } from "../Teacher/teacher";
import style from "./TeachersList.module.scss";

import { ref, get } from "firebase/database";
import { database } from "../../firebase";

const getTeachers = async () => {
  try {
    const snapshot = await get(ref(database, "teachers"));
    if (snapshot.exists()) {
      const data = snapshot.val();
      return Object.values(data); // перетворення об'єкта у масив
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
  const [teachers, setTeachers] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [filters, setFilters] = useState({
    language: "",
    level: "",
    price: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTeachers();
      setTeachers(data);
      setFilteredTeachers(data);
    };
    fetchData();
  }, []);

  // Унікальні мови та рівні для фільтрів
  const uniqueLanguages = Array.from(
    new Set(teachers.flatMap((t) => t.languages))
  );
  const uniqueLevels = Array.from(new Set(teachers.flatMap((t) => t.levels)));

  // Обробник зміни фільтрів
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Фільтрація викладачів при зміні фільтрів
  useEffect(() => {
    console.log(teachers);
    
    let filtered = [...teachers];

    if (filters.language) {
      filtered = filtered.filter((t) => t.languages.includes(filters.language));
    }

    if (filters.level) {
      filtered = filtered.filter((t) => t.levels.includes(filters.level));
    }

    if (filters.price) {
      filtered = filtered.filter((t) => t.price_per_hour <= filters.price);
    }

    setFilteredTeachers(filtered);
  }, [filters, teachers]);

  return (
    <div className={style.listWrapper}>
      <div className={style.filters}>
        <label htmlFor="language" className={style.label}>
          Language
          <select
            name="language"
            value={filters.language}
            onChange={handleFilterChange}
          >
            <option value="">All languages</option>
            {uniqueLanguages.map((lang, idx) => (
              <option key={idx} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="level" className={style.label}>
          Level of knowledge
          <select
            name="level"
            value={filters.level}
            onChange={handleFilterChange}
          >
            <option value="">All levels</option>
            {uniqueLevels.map((lvl, idx) => (
              <option key={idx} value={lvl}>
                {lvl}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="price" className={style.label}>
          Ціна
          <select
            name="price"
            id="price"
            value={filters.price}
            onChange={handleFilterChange}
          >
            <option value="">All prices</option>
            <option value="25">20$</option>
            <option value="30">25$</option>
            <option value="35">30$</option>
            <option value="40">35$</option>
          </select>
        </label>
      </div>

      <div className={style.list}>
        {filteredTeachers.map((teacher, idx) => (
          <Teacher key={idx} teacher={teacher} />
        ))}
      </div>
    </div>
  );
};
