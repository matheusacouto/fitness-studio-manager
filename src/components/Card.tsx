import Ionicons from '@expo/vector-icons/Ionicons'
import {
  StyleProp,
  StyleSheet,
  ViewStyle,
  View,
  Text,
  TextStyle,
} from 'react-native'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/src/components/ui/card'

interface LessonCardProps {
  cardStyle?: StyleProp<ViewStyle>
  headerStyle?: StyleProp<ViewStyle>
  contentStyle?: StyleProp<ViewStyle>
  contentTextStyle?: StyleProp<TextStyle>
  footerStyle?: StyleProp<ViewStyle>
  data: DataProps
  footer?: string
}

interface DataProps {
  id: number
  title: string
  description: string
  subtitle?: string
}

/**
 * Renders a lesson card with a title, description, and additional content.
 *
 * @param {LessonCardProps} props - The props for the lesson card.
 * @returns {JSX.Element} A JSX element representing the lesson card.
 */
const renderLessonCard = ({
  cardStyle,
  headerStyle,
  contentStyle,
  data,
  footer,
  contentTextStyle,
}: LessonCardProps) => {
  return (
    <Card style={[styles.card, cardStyle]}>
      <CardHeader style={headerStyle}>
        <CardTitle
          style={{ fontFamily: 'georgia', fontSize: 20, fontWeight: 'bold' }}
        >
          {data.title}
        </CardTitle>
        {data.subtitle && (
          <CardDescription>
            <Text style={{ fontFamily: 'georgia' }}>
              Professora {data.subtitle}
            </Text>
          </CardDescription>
        )}
      </CardHeader>
      <CardContent style={[styles.content, contentStyle]}>
        <Text
          style={[{ fontFamily: 'georgia', lineHeight: 18 }, contentTextStyle]}
        >
          {data.description}
        </Text>
      </CardContent>
      {footer && (
        <CardFooter style={{ flexDirection: 'row' }}>
          <View
            style={{
              flex: 0.4,
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              backgroundColor: '#000',
              borderRadius: 5,
              padding: 5,
            }}
          >
            <View>
              <Ionicons name="barbell-outline" size={20} color="white" />
            </View>
            <View>
              <Text
                style={{
                  marginLeft: 5,
                  fontFamily: 'georgia',
                  fontWeight: 'bold',
                  color: '#fff',
                }}
              >
                {footer}
              </Text>
            </View>
          </View>
        </CardFooter>
      )}
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
    flexDirection: 'column',
  },
  content: {
    marginTop: 10,
  },
})

