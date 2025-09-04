import React from 'react';
import { 
  MaterialIcons, 
  MaterialCommunityIcons, 
  Ionicons, 
  FontAwesome5,
  AntDesign 
} from '@expo/vector-icons';
import { COLORS } from '../constants/theme';

const Icon = ({ 
  name, 
  library = 'MaterialIcons', 
  size = 24, 
  color = COLORS.text, 
  style 
}) => {
  const getIconComponent = () => {
    switch (library) {
      case 'MaterialIcons':
        return MaterialIcons;
      case 'MaterialCommunityIcons':
        return MaterialCommunityIcons;
      case 'Ionicons':
        return Ionicons;
      case 'FontAwesome5':
        return FontAwesome5;
      case 'AntDesign':
        return AntDesign;
      default:
        return MaterialIcons;
    }
  };

  const IconComponent = getIconComponent();

  return (
    <IconComponent 
      name={name} 
      size={size} 
      color={color} 
      style={style}
    />
  );
};

// Predefined icon components for common use cases
export const AppIcon = {
  Home: (props) => <Icon name="home" library="MaterialIcons" {...props} />,
  Building: (props) => <Icon name="business" library="MaterialIcons" {...props} />,
  Person: (props) => <Icon name="person" library="MaterialIcons" {...props} />,
  PersonWalk: (props) => <Icon name="directions-walk" library="MaterialIcons" {...props} />,
  Vehicle: (props) => <Icon name="directions-car" library="MaterialIcons" {...props} />,
  Camera: (props) => <Icon name="camera-alt" library="MaterialIcons" {...props} />,
  CameraOutline: (props) => <Icon name="camera-outline" library="Ionicons" {...props} />,
  Document: (props) => <Icon name="description" library="MaterialIcons" {...props} />,
  ID: (props) => <Icon name="credit-card" library="MaterialIcons" {...props} />,
  License: (props) => <Icon name="card-membership" library="MaterialIcons" {...props} />,
  Check: (props) => <Icon name="check-circle" library="MaterialIcons" {...props} />,
  CheckOutline: (props) => <Icon name="check-circle-outline" library="MaterialIcons" {...props} />,
  Close: (props) => <Icon name="close" library="MaterialIcons" {...props} />,
  Delete: (props) => <Icon name="delete" library="MaterialIcons" {...props} />,
  Edit: (props) => <Icon name="edit" library="MaterialIcons" {...props} />,
  Back: (props) => <Icon name="arrow-back" library="MaterialIcons" {...props} />,
  Forward: (props) => <Icon name="arrow-forward" library="MaterialIcons" {...props} />,
  Search: (props) => <Icon name="search" library="MaterialIcons" {...props} />,
  Settings: (props) => <Icon name="settings" library="MaterialIcons" {...props} />,
  Info: (props) => <Icon name="info" library="MaterialIcons" {...props} />,
  Warning: (props) => <Icon name="warning" library="MaterialIcons" {...props} />,
  Error: (props) => <Icon name="error" library="MaterialIcons" {...props} />,
  Success: (props) => <Icon name="check-circle" library="MaterialIcons" {...props} />,
  Demo: (props) => <Icon name="science" library="MaterialIcons" {...props} />,
  Lab: (props) => <Icon name="biotech" library="MaterialIcons" {...props} />,
  Phone: (props) => <Icon name="phone" library="MaterialIcons" {...props} />,
  Email: (props) => <Icon name="email" library="MaterialIcons" {...props} />,
  Location: (props) => <Icon name="location-on" library="MaterialIcons" {...props} />,
  Shield: (props) => <Icon name="shield" library="MaterialIcons" {...props} />,
  Security: (props) => <Icon name="security" library="MaterialIcons" {...props} />,
  Lock: (props) => <Icon name="lock" library="MaterialIcons" {...props} />,
  Unlock: (props) => <Icon name="lock-open" library="MaterialIcons" {...props} />,
  Refresh: (props) => <Icon name="refresh" library="MaterialIcons" {...props} />,
  Download: (props) => <Icon name="download" library="MaterialIcons" {...props} />,
  Upload: (props) => <Icon name="upload" library="MaterialIcons" {...props} />,
  Cloud: (props) => <Icon name="cloud" library="MaterialIcons" {...props} />,
  Storage: (props) => <Icon name="storage" library="MaterialIcons" {...props} />,
  Network: (props) => <Icon name="network-check" library="MaterialIcons" {...props} />,
  Offline: (props) => <Icon name="cloud-off" library="MaterialIcons" {...props} />,
  Online: (props) => <Icon name="cloud-done" library="MaterialIcons" {...props} />,
  Add: (props) => <Icon name="add" library="MaterialIcons" {...props} />,
  Remove: (props) => <Icon name="remove" library="MaterialIcons" {...props} />,
  Menu: (props) => <Icon name="menu" library="MaterialIcons" {...props} />,
  More: (props) => <Icon name="more-vert" library="MaterialIcons" {...props} />,
  Star: (props) => <Icon name="star" library="MaterialIcons" {...props} />,
  StarOutline: (props) => <Icon name="star-border" library="MaterialIcons" {...props} />,
  Heart: (props) => <Icon name="favorite" library="MaterialIcons" {...props} />,
  HeartOutline: (props) => <Icon name="favorite-border" library="MaterialIcons" {...props} />,
  Visibility: (props) => <Icon name="visibility" library="MaterialIcons" {...props} />,
  VisibilityOff: (props) => <Icon name="visibility-off" library="MaterialIcons" {...props} />,
  NotificationActive: (props) => <Icon name="notifications-active" library="MaterialIcons" {...props} />,
  Notification: (props) => <Icon name="notifications" library="MaterialIcons" {...props} />,
  NotificationOff: (props) => <Icon name="notifications-off" library="MaterialIcons" {...props} />,
};

export default Icon;
