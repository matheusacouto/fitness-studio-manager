import React, { useEffect, useMemo, useState } from 'react'
import { StyleSheet, View } from 'react-native'

import Timeline from 'react-native-timeline-flatlist'
import LessonCard from '@/src/components/Card'
import CalendarStrip from 'react-native-calendar-strip'

import moment from 'moment'
import 'moment/locale/pt-br'

import { Text } from '../components/ui/text'
import { useColorScheme } from '@/src/hooks/useColorScheme'
import { NAV_THEME } from '@/src/lib/constants'

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState(moment())
  const { colorScheme } = useColorScheme()
  const themeColors = colorScheme === 'dark' ? NAV_THEME.dark : NAV_THEME.light

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

  // Examples of data

  const markedDates = [
    {
      id: 1,
      time: '09:00 - 10:00',
      title: 'Turma 1',
      description: `Esta turma possui ${Math.floor(Math.random() * 100)} alunos vinculados`,
      date: moment(),
    },
    {
      id: 2,
      time: '09:00 - 10:00',
      title: 'Turma 2',
      description: `Esta turma possui ${Math.floor(Math.random() * 100)} alunos vinculados`,
      date: moment(),
    },
    {
      id: 3,
      time: '09:00 - 10:00',
      title: 'Turma 3',
      description: `Esta turma possui ${Math.floor(Math.random() * 100)} alunos vinculados`,
      date: moment(),
    },
    {
      id: 4,
      time: '09:00 - 10:00',
      title: 'Turma 4',
      description: `Esta turma possui ${Math.floor(Math.random() * 100)} alunos vinculados`,
      date: moment(),
    },
    {
      id: 5,
      time: '09:00 - 10:00',
      title: 'Turma 5',
      description: `Esta turma possui ${Math.floor(Math.random() * 100)} alunos vinculados`,
      date: moment(),
    },
  ]

  const filteredData = useMemo(() => {
    return markedDates.filter((item) => item.date.isSame(selectedDate, 'day'))
  }, [selectedDate])

  return (
    <View
      style={[styles.container, { backgroundColor: themeColors.background }]}
    >
      <CalendarStrip
        scrollable
        scrollToOnSetSelectedDate={false}
        markedDates={markedDates}
        daySelectionAnimation={{
          type: 'background',
          highlightColor: '#00997d',
          duration: 100,
        }}
        highlightDateContainerStyle={{
          borderRadius: 5,
          elevation: 1,
        }}
        highlightDateNameStyle={{ fontSize: 12 }}
        highlightDateNumberStyle={{ fontSize: 16, marginTop: 5 }}
        style={{
          flexGrow: 0.19,
          paddingBottom: 1,
        }}
        calendarHeaderStyle={{
          color: themeColors.text,
          fontSize: 20,
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
      {markedDates.length === 0 ? (
        <View style={styles.noDataView}>
          <Text style={styles.noDataText}>
            Nenhuma turma cadastrada, clique no "+" para adicionar
          </Text>
        </View>
      ) : (
        <Timeline
          data={filteredData}
          showTime={false}
          innerCircle="dot"
          lineColor={themeColors.text}
          circleColor={themeColors.text}
          style={styles.list}
          renderDetail={(rowData) => (
            <View style={{ flexDirection: 'column' }}>
              <Text style={[styles.cardText, { color: themeColors.text }]}>
                {rowData.time}
              </Text>
              <LessonCard
                cardStyle={{
                  backgroundColor: themeColors.text,
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
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  list: {
    flex: 1,
    paddingBottom: 60,
    paddingTop: 15,
  },
  cardText: {
    marginBottom: 15,
    fontWeight: 'bold',
    fontSize: 16,
    alignSelf: 'flex-start',
  },
  noDataView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    padding: 20,
    textAlign: 'center',
    fontSize: 18,
    color: 'gray',
  },
})
