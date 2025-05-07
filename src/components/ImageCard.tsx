import { useColorScheme } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import {
  StyleProp,
  StyleSheet,
  ViewStyle,
  View,
  TextStyle,
  ImageBackground,
} from 'react-native'
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card'

import { Text } from '@/src/components/ui/text'

import LightImage from '@/src/assets/images/image-card-light.png'
import DarkImage from '@/src/assets/images/image-card-dark.png'

/**
 * Renders a lesson card with a title, description, and additional content.
 *
 * @param {number} id - The unique identifier for the lesson.
 * @param {string} title - The title of the lesson.
 * @param {string} [description] - The description of the lesson.
 * @param {boolean} [isDarkTheme] - If true, the dark theme will be used. If false, the light theme will be used. If undefined, the theme will be determined by the device's theme settings.
 * @returns {JSX.Element} A JSX element representing the lesson card.
 */
const RenderImageCard = ({
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
  const deviceTheme = useColorScheme()
  const isDarkTheme = deviceTheme === 'dark'

  return (
    <ImageBackground
      source={isDarkTheme ? DarkImage : LightImage}
      imageStyle={{ borderRadius: 15 }}
      style={[styles.card, cardStyle]}
    >
      <CardHeader style={headerStyle}>
        <CardTitle
          style={{
            fontFamily: 'georgia',
            fontSize: 20,
            fontWeight: 'bold',
            color: isDarkTheme ? 'black' : 'white',
          }}
        >
          {data.title}
        </CardTitle>
        {data.subtitle && (
          <CardDescription>
            <Text
              style={{
                fontFamily: 'georgia',
                color: isDarkTheme ? 'black' : 'white',
              }}
            >
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
              color: isDarkTheme ? 'black' : 'white',
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
              backgroundColor: isDarkTheme ? '#fff' : '#000',
              borderRadius: 5,
              padding: 5,
            }}
          >
            <View>
              <Ionicons
                name="barbell-outline"
                size={20}
                color={isDarkTheme ? '#000' : '#fff'}
              />
            </View>
            <View>
              <Text
                style={{
                  marginLeft: 5,
                  fontFamily: 'georgia',
                  fontWeight: 'bold',
                  color: isDarkTheme ? '#000' : '#fff',
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

export default RenderImageCard

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
