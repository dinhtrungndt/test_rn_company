import React from 'react';

const Joke = ({joke}) => {
  return (
    <div>
      <p>{joke.content}</p>
      <div>
        <button>Like</button>
        <button>Dislike</button>
      </div>
    </div>
  );
};

export default Joke;
