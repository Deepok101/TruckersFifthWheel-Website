import React from 'react';
import './App.css';
import Main from './main';
import NavBar from "./components/navbar";
import Posts from "./components/assets/posts";
import NewsFeed from './components/newsfeed'

function App() {
  return (
    <div>
      <NavBar company="DeepEmploi" firstSection="Home" secondSection="NewsFeed" thirdSection="About Us" fourthSection="Contact Us"/>
      <NewsFeed/>
      <Posts accountName="Deepak Singh" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam dapibus maximus iaculis. Phasellus iaculis augue nulla, eu fringilla nisi scelerisque eu. Ut nec nunc rhoncus, auctor sem malesuada, condimentum mi. Sed id urna vestibulum, varius enim eget, congue nisl. Nulla facilisi. Praesent iaculis justo sed commodo venenatis. Duis mauris ante, accumsan et sapien a, mattis aliquam urna. Donec ornare nisl ex, ut vulputate sapien vehicula non. Pellentesque cursus pharetra condimentum."/>
      <Posts accountName="Deepak Singh" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam dapibus maximus iaculis. Phasellus iaculis augue nulla, eu fringilla nisi scelerisque eu. Ut nec nunc rhoncus, auctor sem malesuada, condimentum mi. Sed id urna vestibulum, varius enim eget, congue nisl. Nulla facilisi. Praesent iaculis justo sed commodo venenatis. Duis mauris ante, accumsan et sapien a, mattis aliquam urna. Donec ornare nisl ex, ut vulputate sapien vehicula non. Pellentesque cursus pharetra condimentum."/>
      <Posts accountName="Deepak Singh" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam dapibus maximus iaculis. Phasellus iaculis augue nulla, eu fringilla nisi scelerisque eu. Ut nec nunc rhoncus, auctor sem malesuada, condimentum mi. Sed id urna vestibulum, varius enim eget, congue nisl. Nulla facilisi. Praesent iaculis justo sed commodo venenatis. Duis mauris ante, accumsan et sapien a, mattis aliquam urna. Donec ornare nisl ex, ut vulputate sapien vehicula non. Pellentesque cursus pharetra condimentum."/>
    </div>
  );
}

export default App;

