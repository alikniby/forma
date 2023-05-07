import React from 'react';

const Course = () => {
  return (
    <div className="course">
      <h1>Matematik 1b Kurs</h1>
      <h2>Exempel: Linjära ekvationssystem med två obekanta</h2>
      <p>
        Vi ska lösa ekvationssystemet
        <br />
        <br />
        <strong>
          x + y = 6
          <br />
          2x - y = 4
        </strong>
        <br />
        <br />
        Vi kan använda någon av följande metoder för att lösa detta ekvationssystem:
      </p>
      <ul>
        <li>Substitutionsmetoden</li>
        <li>Additionsmetoden</li>
        <li>Determinantmetoden</li>
      </ul>
      <p>
        I detta exempel kommer vi att använda <strong>Additionsmetoden</strong>.
      </p>
      <p>
        Vi multiplicerar den första ekvationen med 2 och får:
        <br />
        <br />
        <strong>
          2(x + y) = 2 * 6
          <br />
          2x + 2y = 12
        </strong>
      </p>
      <p>
        Nu adderar vi den nya ekvationen och den andra ekvationen:
        <br />
        <br />
        <strong>
          (2x + 2y) + (2x - y) = 12 + 4
          <br />
          4x + y = 16
        </strong>
      </p>
      <p>
        Vi löser den sista ekvationen för x:
        <br />
        <br />
        <strong>
          x = (16 - y) / 4
          <br />
          x = 4 - y/4
        </strong>
      </p>
      <p>
        Slutligen, vi sätter in x i någon av de ursprungliga ekvationerna och löser för y:
        <br />
        <br />
        <strong>
          (4 - y/4) + y = 6
          <br />
          y = 2
        </strong>
      </p>
      <p>
        Vi har nu funnit lösningen till ekvationssystemet:
        <br />
        <br />
        <strong>x = 4, y = 2</strong>
      </p>
    </div>
  );
};

export default Course;
