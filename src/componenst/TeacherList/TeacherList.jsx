import { useEffect, useState } from "react";
import db from "../../db.json";
import { Teacher } from "../Teacher/teacher";
import style from "./TeachersList.module.scss";

export const TeacherList = () => {
  const [languages, setLanguages] = useState([]);
  const [levels, setLevels] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState(db);

  // Зберігаємо вибрані фільтри у стані
  const [filters, setFilters] = useState({
    language: "",
    level: "",
    price: "",
  });

  useEffect(() => {
    const allLanguages = new Set();

    db.forEach((teacher) => {
      teacher.languages.forEach((lang) => {
        allLanguages.add(lang);
      });
    });

    setLanguages(Array.from(allLanguages));
  }, []);

  useEffect(() => {
    const uniqueLevels = Array.from(
      new Set(db.flatMap((teacher) => teacher.levels))
    );
    setLevels(uniqueLevels);
  }, []);

  useEffect(() => {
    // Фільтрація при зміні filters
    let filtered = db;

    if (filters.language) {
      filtered = filtered.filter((teacher) =>
        teacher.languages
          .map((lang) => lang.toLowerCase())
          .includes(filters.language)
      );
    }

    if (filters.level) {
      filtered = filtered.filter((teacher) =>
        teacher.levels
          .map((level) => level.toLowerCase())
          .includes(filters.level)
      );
    }

    if (filters.price) {
      filtered = filtered.filter(
        (teacher) => teacher.price_per_hour >= parseInt(filters.price, 10)
      );
    }

    setFilteredTeachers(filtered);
  }, [filters]);

  const handleSetFilters = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value.toLowerCase(),
    }));
  };

  return (
    <div className={style.listWrapper}>
      <div className={style.filters}>
        <select name="language" id="language" onChange={handleSetFilters} value={filters.language}>
          <option value="">All languages</option>
          {languages.map((language) => (
            <option key={language} value={language.toLowerCase()}>
              {language}
            </option>
          ))}
        </select>

        <select name="level" id="level" onChange={handleSetFilters} value={filters.level}>
          <option value="">All levels</option>
          {levels.map((level) => (
            <option key={level} value={level.toLowerCase()}>
              {level}
            </option>
          ))}
        </select>

        <select name="price" id="price" onChange={handleSetFilters} value={filters.price}>
          <option value="">No price filter</option>
          <option value="25">25$</option>
          <option value="30">30$</option>
          <option value="35">35$</option>
          <option value="40">40$</option>
        </select>
      </div>

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
