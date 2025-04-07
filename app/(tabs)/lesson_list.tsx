import React, { useEffect, useMemo, useState } from 'react'
import CalendarStrip from 'react-native-calendar-strip'
import { StyleSheet, Text, View } from 'react-native'
import Timeline from 'react-native-timeline-flatlist'
import LessonCard from '@/src/components/Card'

import moment from 'moment'
import 'moment/locale/pt-br'

export default function LessonList() {
  const [selectedDate, setSelectedDate] = useState(moment())

  useEffect(() => {
    moment.locale('pt-br')
  }, [])

  useEffect(() => {
    setSelectedDate(moment())
  }, [])

  function getLightRandomColor() {
    const r = Math.floor(160 + Math.random() * 55)
    const g = Math.floor(170 + Math.random() * 55)
    const b = Math.floor(170 + Math.random() * 55)
    return `rgb(${r}, ${g}, ${b})`
  }

  // Exemples of data

  const data = [
    {
      id: 1,
      time: '09:00 - 10:00',
      title: 'Turma 1',
      description: `Esta turma possui ${Math.floor(Math.random() * 100)} alunos vinculados`,
      date: moment().add(0, 'days'),
    },
    {
      id: 2,
      time: '09:00 - 10:00',
      title: 'Turma 2',
      description: `Esta turma possui ${Math.floor(Math.random() * 100)} alunos vinculados`,
      date: moment().add(1, 'days'),
    },
    {
      id: 3,
      time: '09:00 - 10:00',
      title: 'Turma 3',
      description: `Esta turma possui ${Math.floor(Math.random() * 100)} alunos vinculados`,
      date: moment().add(2, 'days'),
    },
    {
      id: 4,
      time: '09:00 - 10:00',
      title: 'Turma 4',
      description: `Esta turma possui ${Math.floor(Math.random() * 100)} alunos vinculados`,
      date: moment().add(3, 'days'),
    },
    {
      id: 5,
      time: '09:00 - 10:00',
      title: 'Turma 5',
      description: `Esta turma possui ${Math.floor(Math.random() * 100)} alunos vinculados`,
      date: moment().add(4, 'days'),
    },
    {
      id: 6,
      time: '10:00 - 11:00',
      title: 'Turma 6',
      description: `Esta turma possui ${Math.floor(Math.random() * 100)} alunos vinculados`,
      date: moment().add(4, 'days'),
    },
    {
      id: 7,
      time: '11:00 - 12:00',
      title: 'Turma 7',
      description: `Esta turma possui ${Math.floor(Math.random() * 100)} alunos vinculados`,
      date: moment().add(4, 'days'),
    },
    {
      id: 8,
      time: '12:00 - 13:00',
      title: 'Turma 8',
      description: `Esta turma possui ${Math.floor(Math.random() * 100)} alunos vinculados`,
      date: moment().add(4, 'days'),
    },
  ]

  const dataComCores = useMemo(() => {
    return data.map((item) => {
      const color = getLightRandomColor()
      return {
        ...item,
        cardColor: color,
        circleColor: color,
        lineColor: color,
        teacher: 'Gel',
      }
    })
  }, [])

  const filteredData = useMemo(() => {
    return dataComCores.filter((item) => item.date.isSame(selectedDate, 'day'))
  }, [dataComCores, selectedDate])

  return (
    <View style={styles.container}>
      <CalendarStrip
        scrollable
        daySelectionAnimation={{
          type: 'background',
          highlightColor: '#00997d',
          duration: 100,
        }}
        iconLeft={null}
        iconRight={null}
        highlightDateContainerStyle={{
          borderRadius: 5,
          elevation: 1,
        }}
        highlightDateNameStyle={{ fontSize: 12 }}
        highlightDateNumberStyle={{ fontSize: 16, marginTop: 5 }}
        style={{
          flexGrow: 0.19,
          paddingTop: 20,
          paddingBottom: 1,
        }}
        calendarHeaderStyle={{
          color: 'black',
          fontSize: 18,
          textTransform: 'capitalize',
        }}
        dateNumberStyle={{ fontSize: 16, marginTop: 5 }}
        weekendDateNameStyle={{ color: 'red' }}
        weekendDateNumberStyle={{ color: 'red' }}
        dateNameStyle={{ fontSize: 12 }}
        onDateSelected={(date) => setSelectedDate(date)}
        selectedDate={selectedDate}
        minDate={moment().subtract(15, 'days')}
        maxDate={moment().add(15, 'days')}
      />
      <Timeline
        data={filteredData}
        showTime={false}
        innerCircle="dot"
        style={styles.list}
        renderDetail={(rowData) => (
          <View style={{ flexDirection: 'column' }}>
            <Text
              style={{
                marginBottom: 15,
                color: 'black',
                fontWeight: 'bold',
                fontSize: 16,
                alignSelf: 'flex-start',
              }}
            >
              {rowData.time}
            </Text>
            <LessonCard
              cardStyle={{
                backgroundColor: rowData.cardColor,
                elevation: 7,
                marginRight: 15,
              }}
              data={{
                subtitle: rowData.teacher,
                id: rowData.id,
                title: rowData.title,
                description: rowData.description,
              }}
            />
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    backgroundColor: '#EBF3F9',
    flex: 1,
    paddingBottom: 40,
    paddingTop: 15,
  },
})
