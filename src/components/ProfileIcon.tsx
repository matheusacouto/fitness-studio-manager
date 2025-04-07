import * as React from 'react'
import { Avatar } from 'react-native-paper'

const avatar = require('@/src/assets/images/default-avatar.png')
const ProfileIcon = () => (
  <Avatar.Image size={30} source={avatar} style={{ backgroundColor: '#fff' }} />
)

export default ProfileIcon
