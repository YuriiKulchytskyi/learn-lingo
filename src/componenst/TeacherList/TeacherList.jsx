import { useEffect, useState } from "react";
import { Teacher } from "../Teacher/Teacher";
import style from "./TeachersList.module.scss";

import { ref, get } from "firebase/database";
import { database } from "../../firebase";


const getTeachers = async () => {
  try {
    const snapshot = await get(ref(database, "teachers"));
    if (snapshot.exists()) {
      const data = snapshot.val();
      return Object.entries(data).map(([id, teacher]) => ({ id, ...teacher }));
    } else {
      console.log("No data");
      return [];
    }
  } catch (error) {
    console.error("Receiving data error:", error);
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

  const uniqueLanguages = Array.from(
    new Set(
      teachers.flatMap((t) =>
        Array.isArray(t.languages) ? t.languages : []
      )
    )
  );

  const uniqueLevels = Array.from(
    new Set(
      teachers.flatMap((t) =>
        Array.isArray(t.levels) ? t.levels : []
      )
    )
  );

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    let filtered = [...teachers];

    if (filters.language) {
      filtered = filtered.filter(
        (t) => Array.isArray(t.languages) && t.languages.includes(filters.language)
      );
    }

    if (filters.level) {
      filtered = filtered.filter(
        (t) => Array.isArray(t.levels) && t.levels.includes(filters.level)
      );
    }

    if (filters.price) {
      filtered = filtered.filter(
        (t) => t.price_per_hour <= Number(filters.price)
      );
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
          Price
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
        {filteredTeachers.length > 0 ? (
          filteredTeachers.map((teacher) => (
            <Teacher key={teacher.id} teacherId={teacher.id} teacher={teacher} />
          ))
        ) : (
          <p>No teachers found.</p>
        )}
      </div>
    </div>
  );
};
