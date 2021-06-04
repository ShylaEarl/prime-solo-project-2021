import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

function AboutPage() {

  const element = <FontAwesomeIcon icon={faStar} /> 

  return (
    <div className="card-whole">
      <h2>Technologies Used:</h2>
      <ul>
        <li>{element} javaScript </li>
        <li>{element} express </li>
        <li>{element} node </li>
        <li>{element} sql </li>
        <li>{element} react </li>
        <li>{element} redux </li>
        <li>{element} hooks </li>
        <li>{element} css grid </li>
        <li>{element} moment.js </li>
        <li>{element} font awesome </li>
        <li>{element} a whole lotta love </li>
      </ul>
    </div>
  );
}

export default AboutPage;
