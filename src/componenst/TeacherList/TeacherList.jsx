// import { useState } from "react";
import db from "../../db.json";
import  {Teacher} from "./Teacher/Teacher";

export const TeacherList = () => {
  // const [teachers, setTeachers] = useState([]);

  return (
    <div>
      <h2>Список викладачів</h2>
      <ul>
        {db.map((teacher) => (
          <li key={teacher.name + teacher.surname}>
            <Teacher teacher={teacher}/>
          </li>
        ))}
      </ul>
    </div>
  );
};
