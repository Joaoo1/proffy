import React, { useState, FormEvent } from 'react';
import api from '../../services/api';
import PageHeader from '../../components/PageHeader';


import './styles.css'
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';


function TeacherList() {
  const [teachers, setTeachers] = useState([]);
  const [subject, setSubject] = useState('');
  const [week_day, setWeekday] = useState('');
  const [time, setTime] = useState('');

  async function searchTeachers(e: FormEvent) {
    e.preventDefault();

    const response = await api.get('classes', {
      params: {
        subject,
        week_day,
        time
      }
    });

    setTeachers(response.data);
  }

  return (
   <div id="page-teacher-list" className="container">
     <PageHeader title="Estes são os proffys disponíveis">
       <form id="search-teachers" onSubmit={searchTeachers}>
        <Select 
              name="subject" 
              value={subject}
              onChange={e => {setSubject(e.target.value)}}
              label="Matéria"
              options={[
                { value: 'Artes', label: 'Artes' },
                { value: 'Biologia', label: 'Biologia' },
                { value: 'Ciências', label: 'Ciências' },
                { value: 'Educação física', label: 'Educação física' },
                { value: 'Geogragia', label: 'Geogragia' },
                { value: 'História', label: 'História' },
                { value: 'Química', label: 'Química' },
                { value: 'Matemática', label: 'Matemática' },
                { value: 'Português', label: 'Português' },
              ]}
        />

        <Select 
              name="week_day"
              value={week_day}
              onChange={e => { setWeekday(e.target.value) }}
              label="Dia da semana"
              options={[ 
                { value: '0', label: 'Domingo' },
                { value: '1', label: 'Segunda-feira' },
                { value: '2', label: 'Terça-feira' },
                { value: '3', label: 'Quarta-feira' },
                { value: '4 física', label: 'Quinta-feira' },
                { value: '5', label: 'Sexta-feira' },
                { value: '6', label: 'Sabádo' },
              ]}
        />
        <Input 
          type="time" 
          name="time" 
          value={time}
          onChange={e => {setTime(e.target.value)}}
          label="Hora"
         />
         <button type="submit">
           Buscar
         </button>
       </form>
       </PageHeader>
      <main>
        {teachers.map((teacher: Teacher) => {
          return <TeacherItem key={teacher.id} teacher={teacher} />
        })} 
      </main>
   </div>
  )
}

export default TeacherList;