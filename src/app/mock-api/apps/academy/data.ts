/* eslint-disable */
export const categories = [
    {
        id: '9a67dff7-3c38-4052-a335-0cef93438ff6',
        title: 'Swift UI',
        slug: 'Swift UI',
    },

    {
        id: '02f42092-bb23-4552-9ddb-cfdcc235d48f',
        title: 'Flutter',
        slug: 'Flutter',
    },
    {
        id: '5648a630-979f-4403-8c41-fc9790dea8cd',
        title: 'Android',
        slug: 'android',
    },
];
export const courses = [
    {
        id: '694e4e5f-f25f-470b-bd0e-26b1d4f64028',
        title: 'Swift N: Quick Integration',
        slug: 'Swift UI',
        description: 'Introductory course for Angular and framework basics',
        category: 'Swift UI',
        duration: 30,
        totalSteps: 11,
        updatedAt: 'Jun 28, 2021',
        featured: true,
        progress: {
            currentStep: 3,
            completed: 2,
        },
    },

    {
        id: '0c06e980-abb5-4ba7-ab65-99a228cab36b',
        title: 'Android N: Quick Integration',
        slug: 'android-n-quick-settings',
        description: 'Step by step guide for Android N: Quick Settings',
        category: 'android',
        duration: 120,
        totalSteps: 11,
        updatedAt: 'May 08, 2021',
        featured: false,
        progress: {
            currentStep: 10,
            completed: 1,
        },
    },


    {
        id: 'fad2ab23-1011-4028-9a54-e52179ac4a50',
        title: 'Manage Your Pivotal Flutter Foundry App\'s Using Apigee Edge',
        slug: 'manage-your-pivotal-Flutter-foundry-apps-using-apigee-Edge',
        description: 'Introductory course for Pivotal Flutter Foundry App',
        category: 'Flutter',
        duration: 90,
        totalSteps: 9,
        updatedAt: 'Jun 24, 2021',
        featured: false,
        progress: {
            currentStep: 0,
            completed: 0,
        },
    },

];
export const demoCourseContent = `
<h2>Flutter Package Documentation</h2>
<h5>Using CrossChat SDK on Flutter</h5>

<h2>Introduction</h2>
<p>Welcome to the documentation for FlutterPackage. FlutterPackage is a Flutter SDK developed by MobilLegends. It provides a set of reusable components and utilities for building chat applications using the Flutter framework.</p>

<h2>Features</h2>
<div class="card-container">
  <div class="card">
    <h3>Chat UI Components</h3>
    <p>Ready-to-use UI components for building chat interfaces, including message bubbles, input fields, avatars, and more.</p>
  </div>
  <div class="card">
    <h3>Message Parsing</h3>
    <p>Utilities for parsing and displaying different types of chat messages, such as text messages, images, videos, and emojis.</p>
  </div>
  <div class="card">
    <h3>Real-time Updates</h3>
    <p>Integration with real-time communication protocols, allowing real-time message updates and presence information.</p>
  </div>
  <div class="card">
    <h3>User Management</h3>
    <p>APIs and tools for managing chat users, including user authentication, profile management, and user presence.</p>
  </div>
  <div class="card">
    <h3>Customization Options</h3>
    <p>Configurable options for customizing the appearance and behavior of the chat components to match your application's design.</p>
  </div>
  <div class="card">
    <h3>Voice & Video Call</h3>
    <p>Features for voice and video calls.</p>
  </div>
</div>



<h2>Usage</h2>
<h3>ChatView</h3>
<p>The <code>RecentChatsPage</code> widget demonstrates how to implement a recent chats page using the CrossChat SDK. It showcases the integration of user profiles, chat history, and messaging capabilities within a Flutter application.</p>
<ol>
  <li>
    Create a list of users who will use your chat feature:
    <div class="code-editor">
      <div class="header">
        <span class="title">Your_Screen.dart</span>
      </div>
      <div class="editor-content">
        <code class="code">
          <p>final users = [</p>
          <p>  User(id: 5, name: 'Sam', imageUrl: 'assets/images/sam.jpg'),</p>
          <p>  User(id: 7, name: 'Charlie', imageUrl: 'assets/images/steven.jpg'),</p>
          <p>  User(id: 4, name: 'Alice', imageUrl: 'assets/images/olivia.jpg'),</p>
          <p>  User(id: 3, name: 'Bob', imageUrl: 'assets/images/john.jpg'),</p>
          <p>  User(id: 1, name: 'Greg', imageUrl: 'assets/images/greg.jpg'),</p>
          <p>];</p>
        </code>
      </div>
    </div>
  </li>
  <li>
    Set up your <code>ContactsSDK</code> with the necessary data:
    <div class="code-editor">
      <div class="header">
        <span class="title">Your_Screen.dart</span>
      </div>
      <div class="editor-content">
        <code class="code">
          <p>final contactsSDK = ContactsSDK(</p>
          <p>  users: users,</p>
          <p>  currentUserId: 'Alice',</p>
          <p>  apiKey: '38c0cdc8ae4d95a05047158b5104e0485bc854ef',</p>
          <p>);</p>
        </code>
      </div>
    </div>
  </li>
  <li>
    Customize your users list UI by adjusting the values of <code>backgroundColor</code>, <code>textColor</code>, <code>iconColor</code>, <code>avatarRadius</code>, and <code>userNameTextStyle</code>:
    <div class="code-editor">
      <div class="header">
        <span class="title">Your_Screen.dart</span>
      </div>
      <div class`



export const demoCourseSteps = [
    {
        order: 0,
        title: 'Introduction',
        subtitle: 'Introducing the library and how it works',
        content: `<h2 class="text-2xl sm:text-3xl">Introduction</h2> <h2>Introduction</h2>
        <p>Welcome to the documentation for FlutterPackage. FlutterPackage is a Flutter SDK package developed by MobilLegends. It provides a set of reusable components and utilities for building chat applications using the Flutter framework.</p>

        <h2>Features</h2>
        <div class="card-container">
          <div class="card">
            <h3>Chat UI Components</h3>
            <p>Ready-to-use UI components for building chat interfaces, including message bubbles, input fields, avatars, and more.</p>
          </div>
          <div class="card">
            <h3>Message Parsing</h3>
            <p>Utilities for parsing and displaying different types of chat messages, such as text messages, images, videos, and emojis.</p>
          </div>
          <div class="card">
            <h3>Real-time Updates</h3>
            <p>Integration with real-time communication protocols, allowing real-time message updates and presence information.</p>
          </div>
          <div class="card">
            <h3>User Management</h3>
            <p>APIs and tools for managing chat users, including user authentication, profile management, and user presence.</p>
          </div>
          <div class="card">
            <h3>Customization Options</h3>
            <p>Configurable options for customizing the appearance and behavior of the chat components to match your application's design.</p>
          </div>
          <div class="card">
            <h3>Voice & Video Call</h3>
            <p>Features for voice and video calls.</p>
          </div>
        </div>`,
    },
    {
        order: 1,
        title: 'Get the sample code',
        subtitle: 'Where to find the sample code and how to access it',
        content: `<h2 class="text-2xl sm:text-3xl">Get the sample code</h2>
                   <p>You can find the sample code for this project on our GitHub repository. Visit <a href="https://github.com/MobilLegends2/FlutterPackage">https://github.com/MobilLegends2/FlutterPackage</a> to clone or download the sample code.</p>`,
    },
    {
        order: 2,
        title: 'Installation',
        subtitle: 'How to install the dependencie',
        content: `<h2 class="text-2xl sm:text-3xl">Installation</h2>
                   <p>Follow these steps To use FlutterPackage  in your Flutter project and set it up locally:</p>
                   <h2>Installation</h2>

<ol>
  <li>Add the following dependency to your <code>pubspec.yaml</code> file:</li>
  <div class="code-editor">
    <div class="header">
      <span class="title">pubspec.yaml</span>
    </div>
    <div class="editor-content">
      <code class="code">
        <p>crosschatsdk:</p>

        <p>  git:</p>

        <p>  <pre><code>  url: https://github.com/MobilLegends2/flutter_package_crosschat.git  </code></pre></p>
        <p>    ref: main # or any branch or commit hash you want to use</p>
      </code>

    </div>
  </div>
  <li>Run the following command in your project directory to fetch the package:</li>
  <div class="code-editor">
    <div class="header">
      <span class="title">Terminal</span>
    </div>
    <div class="editor-content">
    <pre><code>
      <code class="code">flutter pub get</code>
      </code></pre>
    </div>
  </div>
  <li>Import the package in your Dart code:</li>
  <div class="code-editor">
    <div class="header">
      <span class="title">Your_Screen.dart</span>
    </div>
    <div class="editor-content">
    <pre><code>
      <code class="code">
        <p>import 'package:crosschatsdk/contactssdk.dart';</p>
        <p>import 'package:crosschatsdk/recentchatssdk.dart';</p>
      </code>
      </code></pre>
    </div>
  </div>
</ol>`,
    },
    {
        order: 3,
        title: 'how to implement a recent chats page using the CrossChat SDK',
        subtitle: '',
        content: `<div class="code-editor">
        <div class="header">

          <span class="title">First of all, start with creating a list of users who will use your chat feature:</span>
        </div>
        <div class="editor-content">
        <pre><code>
          <code class="code">
            final users = [ <br>
            User(id: <span class="number">5</span>, name: '<span class="string">Sam</span>', imageUrl: '<span class="string">assets/images/sam.jpg</span>'),<br>
            User(id: <span class="number">7</span>, name: '<span class="string">Charlie</span>', imageUrl: '<span class="string">assets/images/steven.jpg</span>'),<br>
            User(id: <span class="number">4</span>, name: '<span class="string">Alice</span>', imageUrl: '<span class="string">assets/images/olivia.jpg</span>'),<br>
            User(id: <span class="number">3</span>, name: '<span class="string">Bob</span>', imageUrl: '<span class="string">assets/images/john.jpg</span>'),<br>
            User(id: <span class="number">1</span>, name: '<span class="string">Greg</span>', imageUrl: '<span class="string">assets/images/greg.jpg</span>'),<br>
            ];
          </code>
          </code></pre>
        </div>
      </div>

    </li>
    <li>
      <p>After that, set up your <code>ContactsSDK</code> with the necessary data:</p>
      <pre><code>
      <div class="code-editor">
        <div class="header">
          <span class="title">Your_Screen.dart</span>
        </div>
        <div class="editor-content">
          <code class="code">
            final contactsSDK = ContactsSDK(<br>
            users: users,<br>
            currentUserId: '<span class="string">Alice</span>',<br>
            apiKey: '<span class="string">YOUR_API_KEY</span>',<br>
            );
          </code>
          </code></pre>
        </div>
      </div>`,
    },

    {
        order: 4,
        title: 'Create Application on Platform',
        subtitle: 'Using the Platform to Create Your Application',
        content: `<h2 class="text-2xl sm:text-3xl">Create Application on Platform</h2>
                   <p>To create your application on the platform, you need to follow these steps:</p>
                   <ol>
                       <li>Obtain your secret key from the platform.</li>
                       <li>Visit <a href="http://localhost:4200/project">http://localhost:4200/project</a>.</li>
                       <li>Enter your secret key and follow the on-screen instructions to create your application.</li>
                   </ol>
                   <button onclick="window.location.href='http://localhost:4200/project'">Create Application</button>`,
    },


    {
        order: 5,
        title: 'customize your user list UI',
        subtitle: 'How to moderate images; crop, resize, optimize',
        content: `<li>
        <p>After that, in your scaffold, you should implement the ContactsSDK and other details as shown below in the code snippet:</p>
        <div class="code-editor">
          <div class="header">
            <span class="title">Your_Screen.dart (Scaffold)</span>
          </div>
          <div class="editor-content">
          <pre><code>
            <code class="code">
              return Scaffold(<br>
              appBar: AppBar(<br>
              backgroundColor: Color.fromARGB(255, 34, 40, 49),<br>
              title: Text(<br>
              '<span class="string">Messenger</span>',<br>
              style: TextStyle(color: Colors.white),<br>
              ),<br>
              elevation: 0,<br>
              centerTitle: true,<br>
              ),<br>
              backgroundColor: Colors.black,<br>
              body: Column(<br>
              children: [<br>
              FavouriteContacts(contactsSDK: contactsSDK),<br>
              Expanded(<br>
              child: RecentChatsSDK(<br>
              currentUserId: '<span class="string">Alice</span>',<br>
              apiKey: '<span class="string">38c0cdc8ae4d95a05047158b5104e0485bc854ef</span>',<br>
              users: users,<br>
              backgroundColor: Colors.black,<br>
              chatBackgroundColor: Color.fromARGB(255, 34, 40, 49),<br>
              chatTextColor: Colors.white,<br>
              deleteIconColor: Colors.white,<br>
              deleteBackgroundColor: Colors.red,<br>
              avatarRadius: 30.0,<br>
              senderNameTextStyle: TextStyle(<br>
              fontSize: 16.0,<br>
              fontWeight: FontWeight.bold,<br>
              color: Colors.white,<br>
              ),<br>
              messageTextStyle: TextStyle(<br>
              fontSize: 14.0,<br>
              fontWeight: FontWeight.normal,<br>
              color: Colors.grey,<br>
              ),<br>
              timestampTextStyle: TextStyle(<br>
              fontSize: 12.0,<br>
              fontWeight: FontWeight.normal,<br>
              color: Colors.grey,<br>
              ),<br>
              ),<br>
              ),<br>
              ],<br>
              ),<br>
              );
            </code>
            </code></pre>
          </div>
        </div>

      </li>`,
    },
    {
        order: 6,
        title: 'Your Code',
        subtitle: 'Finally, your code should look like this:',
        content: `<pre><code><li>

        <div class="code-editor">
          <div class="header">
            <span class="title">Your_Screen.dart</span>
          </div>
          <div class="editor-content">
            <code class="code">
              <span class="keyword">import</span> 'package:crosschatsdk/Contactssdk.dart';<br>
              <span class="keyword">import</span> 'package:flutter/material.dart';<br>
              <span class="keyword">import</span> 'package:crosschatsdk/recentchatssdk.dart';<br><br>
              <span class="keyword">class</span> RecentChatsPage <span class="keyword">extends</span> StatelessWidget &#10100;<br>
              &nbsp; <span class="keyword">final</span> List&lt;User&gt; users = [<br>
              &nbsp; &nbsp; User(id: 5, name: 'Sam', imageUrl: 'assets/images/sam.jpg'),<br>
              &nbsp; &nbsp; User(id: 7, name: 'Charlie', imageUrl: 'assets/images/steven.jpg'),<br>
              &nbsp; &nbsp; User(id: 4, name: 'Alice', imageUrl: 'assets/images/olivia.jpg'),<br>
              &nbsp; &nbsp; User(id: 3, name: 'Bob', imageUrl: 'assets/images/john.jpg'),<br>
              &nbsp; &nbsp; User(id: 1, name: 'Greg', imageUrl: 'assets/images/greg.jpg'),<br>
              &nbsp; ];<br><br>
              &nbsp; @<span class="keyword">override</span><br>
              &nbsp; <span class="keyword">Widget</span> build(BuildContext context) &#10100;<br>
              &nbsp; &nbsp; <span class="keyword">final</span> contactsSDK = ContactsSDK(<br>
              &nbsp; &nbsp; &nbsp; users: users,<br>
              &nbsp; &nbsp; &nbsp; currentUserId: 'Alice',<br>
              &nbsp; &nbsp; &nbsp; apiKey: '38c0cdc8ae4d95a05047158b5104e0485bc854ef',<br>
              &nbsp; &nbsp; &nbsp; backgroundColor: Colors.black,<br>
              &nbsp; &nbsp; &nbsp; textColor: Colors.blueGrey,<br>
              &nbsp; &nbsp; &nbsp; iconColor: Colors.green,<br>
              &nbsp; &nbsp; &nbsp; avatarRadius: 30.0,<br>
              &nbsp; &nbsp; &nbsp; userNameTextStyle: TextStyle(<br>
              &nbsp; &nbsp; &nbsp; &nbsp; color: Colors.blueGrey,<br>
              &nbsp; &nbsp; &nbsp; &nbsp; fontSize: 16.0,<br>
              &nbsp; &nbsp; &nbsp; &nbsp; fontWeight: FontWeight.w600,<br>
              &nbsp; &nbsp; &nbsp; ),<br>
              &nbsp; &nbsp; );<br><br>
              &nbsp; &nbsp; <span class="keyword">return</span> Scaffold(<br>
              &nbsp; &nbsp; &nbsp; appBar: AppBar(<br>
              &nbsp; &nbsp; &nbsp; &nbsp; backgroundColor: Color.fromARGB(255, 34, 40, 49),<br>
              &nbsp; &nbsp; &nbsp; &nbsp; title: Text(<br>
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 'Messenger',<br>
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; style: TextStyle(color: Colors.white),<br>
              &nbsp; &nbsp; &nbsp; &nbsp; ),<br>
              &nbsp; &nbsp; &nbsp; &nbsp; elevation: 0,<br>
              &nbsp; &nbsp; &nbsp; &nbsp; centerTitle: true,<br>
              &nbsp; &nbsp; &nbsp; ),<br>
              &nbsp; &nbsp; &nbsp; backgroundColor: Colors.black,<br>
              &nbsp; &nbsp; &nbsp; body: Column(<br>
              &nbsp; &nbsp; &nbsp; &nbsp; children: [<br>
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; FavouriteContacts(contactsSDK: contactsSDK),<br>
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Expanded(<br>
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; child: RecentChatsSDK(<br>
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; currentUserId: 'Alice',<br>
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; apiKey: '38c0cdc8ae4d95a05047158b5104e0485bc854ef',<br>
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; users: users,<br>
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; backgroundColor: Colors.black,<br>
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; chatBackgroundColor: Color.fromARGB(255, 34, 40, 49),<br>
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; chatTextColor: Colors.white,<br>
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; deleteIconColor: Colors.white,<br>
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; deleteBackgroundColor: Colors.red,<br>
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; avatarRadius: 30.0,<br>
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; senderNameTextStyle: TextStyle(<br>
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; fontSize: 16.0,<br>
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; fontWeight: FontWeight.bold,<br>
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; color: Colors.white,<br>
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ),<br>
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; messageTextStyle: TextStyle(<br>
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; fontSize: 14.0,<br>
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; fontWeight: FontWeight.normal,<br>
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; color: Colors.grey,<br>
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ),<br>
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; timestampTextStyle: TextStyle(<br>
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; fontSize: 12.0,<br>
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; fontWeight: FontWeight.normal,<br>
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; color: Colors.grey,<br>
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ),<br>
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ),<br>
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ),<br>
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ),<br>
              &nbsp; &nbsp; &nbsp; ],<br>
              &nbsp; &nbsp; ),<br>
              &nbsp; ;<br>
            </code>
          </div>
        </div>

      </li></code></pre>`,
    },
    {
        order: 7,
        title: 'Deploy and run the Flutter app',
        subtitle: 'How to build, push and run the project remotely',
        content: `<h2 class="text-2xl sm:text-3xl">Deploy and run theFlutetr app</h2>
                   <p>Follow these steps to deploy and run yourFlutetr app:</p>
                   <ol>
                       <li>Open your terminal and navigate to your project directory.</li>
                       <li>Build your app using Xcode or the command line.</li>
                       <li>Deploy your app to a connected device or simulator.</li>
                   </ol>`,
    },
    {
        order: 8,
        title: 'Congratulations!',
        subtitle: 'Nice work, you have created your first application',
        content: `<h2 class="text-2xl sm:text-3xl">Congratulations!</h2>
                   <p>Nice work! You have successfully created and integrated your first application with our platform. You can now explore more features and functionalities to enhance your app.</p>`,
    },
];

