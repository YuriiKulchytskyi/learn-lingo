import { useMemo } from "react"
import { TeacherList } from "../componenst/TeacherList/TeacherList"

export const TeacherPage = () => {

  const memorizedTeachers = useMemo(() => <TeacherList/>, [])

  return memorizedTeachers
}
