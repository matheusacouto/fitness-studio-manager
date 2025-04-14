import React, { useEffect, useMemo, useState } from 'react'
import CalendarStrip from 'react-native-calendar-strip'
import { StyleSheet, Text, View } from 'react-native'
import Timeline from 'react-native-timeline-flatlist'
import LessonCard from '@/src/components/Card'

import moment from 'moment'
import 'moment/locale/pt-br'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function CalendarPage() {
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

  const markedDates = []

  const dataComCores = useMemo(() => {
    return markedDates.map((item) => {
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
    <SafeAreaView>
      <View style={styles.container}>
        <CalendarStrip
          scrollToOnSetSelectedDate={false}
          scrollable
          markedDates={markedDates}
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
                    elevation: 4,
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
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
    paddingBottom: 60,
    paddingTop: 15,
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
