import Ionicons from '@expo/vector-icons/Ionicons'
import {
  StyleProp,
  StyleSheet,
  ViewStyle,
  View,
  Text,
  TextStyle,
  ImageBackground,
} from 'react-native'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/src/components/ui/card'

import cardImage from '../assets/images/imagecard.png'

/**
 * Renders a lesson card with a title, description, and additional content.
 *
 * @param {number} id - The unique identifier for the lesson.
 * @param {string} title - The title of the lesson.
 * @param {string} [description] - The description of the lesson.
 * @returns {JSX.Element} A JSX element representing the lesson card.
 */
const renderImageCard = ({
  cardStyle,
  headerStyle,
  contentStyle,
  data,
  footer,
  contentTextStyle,
}: {
  cardStyle?: StyleProp<ViewStyle>,
  headerStyle?: StyleProp<ViewStyle>,
  contentStyle?: StyleProp<ViewStyle>,
  contentTextStyle?: StyleProp<TextStyle>,
  footerStyle?: StyleProp<ViewStyle>,
  data: {
    id: number,
    title: string,
    description: string,
    subtitle?: string,
  },
  footer?: string,
}) => {
  return (
    <ImageBackground
      source={cardImage}
      imageStyle={{ borderRadius: 15 }}
      style={[styles.card, cardStyle]}
    >
      <CardHeader style={headerStyle}>
        <CardTitle
          style={{
            fontFamily: 'georgia',
            fontSize: 20,
            fontWeight: 'bold',
            color: 'white',
          }}
        >
          {data.title}
        </CardTitle>
        {data.subtitle && (
          <CardDescription>
            <Text style={{ fontFamily: 'georgia', color: 'white' }}>
              Professora {data.subtitle}
            </Text>
          </CardDescription>
        )}
      </CardHeader>
      <CardContent style={[styles.content, contentStyle]}>
        <Text
          style={[
            {
              fontFamily: 'georgia',
              lineHeight: 18,
              color: 'white',
              maxWidth: '70%',
            },
            contentTextStyle,
          ]}
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
              backgroundColor: '#fff',
              borderRadius: 5,
              padding: 5,
            }}
          >
            <View>
              <Ionicons name="barbell-outline" size={20} color="#000" />
            </View>
            <View>
              <Text
                style={{
                  marginLeft: 5,
                  fontFamily: 'georgia',
                  fontWeight: 'bold',
                }}
              >
                {footer}
              </Text>
            </View>
          </View>
        </CardFooter>
      )}
    </ImageBackground>
  )
}

export default renderImageCard

const styles = StyleSheet.create({
  card: {
    padding: 15,
    borderRadius: 15,
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  content: {
    marginTop: 10,
  },
})
