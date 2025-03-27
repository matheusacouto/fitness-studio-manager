import { View } from '@rn-primitives/slot'
import { StyleProp, StyleSheet, ViewStyle } from 'react-native'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/src/components/ui/card'
import { Text } from '~/src/components/ui/text'

/**
 * Renders a lesson card with a title, description, and additional content.
 *
 * @param {number} id - The unique identifier for the lesson.
 * @param {string} title - The title of the lesson.
 * @param {string} description - The description of the lesson.
 * @returns {JSX.Element} A JSX element representing the lesson card.
 */
const renderLessonCard = ({
  style,
  data,
  footer,
}: {
  style?: StyleProp<ViewStyle>
  data: {
    id: number,
    title: string,
    description: string,
    teacher: string,
  },
  footer?: string,
}) => {
  return (
    <Card style={[styles.card, style]}>
      <CardHeader>
        <CardTitle style={{ fontWeight: 'bold', fontSize: 20 }}>
          {data.title}
        </CardTitle>
        <CardDescription>Professora {data.teacher}</CardDescription>
      </CardHeader>
      <CardContent style={styles.content}>
        <Text>{data.description}</Text>
      </CardContent>
      <CardFooter>
        <Text>{footer}</Text>
      </CardFooter>
    </Card>
  )
}

export default renderLessonCard

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 15,
    borderRadius: 15,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    borderColor: 'orange',
    marginTop: 10,
  },
})
