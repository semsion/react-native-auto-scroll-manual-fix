

## Impetus 

This repository was created to address persistent scrolling issues within a TextInput on Android in React Native, providing a practical solution for smoother user interactions. 

## To run
1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

## To note
The issue of the keyboard avoiding the view on Android is a very mixed bag in terms of how it operates in different applications, and different devices. This issue can be observed when the user clicks on a text input in a view and the screen doesn't correctly scroll upwards to allow the cursor to be visible. 
In this implementation, in the Android emulator, and against a development build, it appears to be largely resolved, aside from some circumstances when you click on the bottom most edge of the user TextInput, however the behaviour also manifests itself differently on other hardware platforms (Samsung, HTC). This is a wide and still ever present issue (depending on the device, and OS version) with other vendor applications on Android, such as the OpenAI ChatGPT app, Trello, and even some Google products.

Test specifications: Android Studio Ladybug | 2024.2.1 Patch 1. Emulator version 35.2.10-12414864. Android version 14.0 (U) - API 34.




## How?

Here we're using an Expo development build to match as closely as possible the functionality that an end user would have on their particular device. That said, the correct behaviour of the solution appears largely the same when testing with Expo Go (see the '[To run](#to-run)' section above), as via the development build (see the '[To run](#to-run)' section above), minus the keyboard avoiding view issue (see the '[To note](#to-note)' section above). It is yet to be tested on iOS.

The solution uses separate TextInput components for both the user input and the (simulated) conversational feedback. After the initial two TextInput components are rendered, further TextInput components are generated on the fly. Each time feedback is rendered to the app, a second TextInput is rendered to allow for further user input. This enables the ability to retain a scrollable view within the user defined content (see gif below).

For the height of the user input TextInput, flex: 1 is used instead of height: '100%'. Using flex: 1 makes the component expand to fill the available space in its parent container, distributing space according to Flexbox layout rules. This approach is more flexible and responsive compared to using height: '100%'.



<div style="text-align: center; margin-top: 50px">
   <img src="./assets/gif/anim.gif" width="320" alt="Demo">
</div>