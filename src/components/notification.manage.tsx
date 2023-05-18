import PushNotification from 'react-native-push-notification';
import BackgroundTask from 'react-native-background-task';

BackgroundTask.define(() => {
  const now = new Date();
  const currentHour = now.getHours();
  
  // Conditionally trigger notification based on the current hour
  if (currentHour === 9) {
    const notificationOptions = {
      message: 'Good morning! It\'s 9 AM!',
    };
  
    PushNotification.localNotification(notificationOptions);
  }

  BackgroundTask.finish();
});

const NotificationManager = {
  startBackgroundTask: () => {
    BackgroundTask.schedule({
      period: 1800, // 30 minutes in seconds
    });
  },
};

export default NotificationManager;