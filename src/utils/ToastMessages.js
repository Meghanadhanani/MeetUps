import Toast from 'react-native-toast-message';

// Success Toast
export const showToastMSGNormal = (data) => {
  Toast.show({
    type: "success",
    position: "bottom",
    text1: data,
    visibilityTime: 2000,
    autoHide: true,
    topOffset: 30,
    bottomOffset: 0,
    style: {
      borderRadius: 50, // Add border radius here
    },
  });
};

// Error Toast (Failure)
export const showToastMSGError = (data) => {
  Toast.show({
    type: "error",
    position: "bottom",
    text1: data,
    visibilityTime: 2000,
    autoHide: true,
    topOffset: 30,
    bottomOffset: 0,
  });
};

// Info Toast (For general information)
export const showToastMSGInfo = (data) => {
  Toast.show({
    type: "info",
    position: "bottom",
    text1: data,
    visibilityTime: 2000,
    autoHide: true,
    topOffset: 30,
    bottomOffset: 0,
  });
};

// Warning Toast
export const showToastMSGWarning = (data) => {
  Toast.show({
    type: "info",  // You can use 'info' for a warning toast type as well, or create a custom type
    position: "bottom",
    text1: data,
    visibilityTime: 2000,
    autoHide: true,
    topOffset: 30,
    bottomOffset: 0,
  });
};
