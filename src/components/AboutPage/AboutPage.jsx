import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

function AboutPage() {

  const element = <FontAwesomeIcon icon={faStar} /> 

  return (
    <div className="card-whole-left-align">
      <h2>Technologies Used:</h2>
      <ul>
        <li>&#9651; javaScript </li>
        <li>&#9651; express </li>
        <li>&#9651; node </li>
        <li>&#9651; sql </li>
        <li>&#9651; react </li>
        <li>&#9651; redux </li>
        <li>&#9651; hooks </li>
        <li>&#9651; css grid </li>
        <li>&#9651; moment.js </li>
        <li>&#9651; a whole lotta love </li>
      </ul>
    </div>
  );
}

export default AboutPage;
