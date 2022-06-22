import React, { useState } from "react";

function TextForm() {
  const [word, setWord] = useState("");
  const [status, setStatus] = useState({
    content: "",
    picture: ""
  });
  const [post, setPost] = useState([]);
  const [art, setArt] = useState([]);

  const [searchBar, setSearchBar] = useState(false);
  const [show, setShow] = useState(false);

  const APIget = () => {
    fetch(
      word === ""
        ? "https://api.giphy.com/v1/gifs/trending?api_key=4M2LRBM14f9SgmjE6ZnRY41mMKGa2nGc&limit=20&rating=g"
        : `https://api.giphy.com/v1/gifs/search?api_key=4M2LRBM14f9SgmjE6ZnRY41mMKGa2nGc&q=${word}&limit=20&offset=0&rating=g&lang=en`
    )
      .then((response) => response.json())
      .then((content) => {
        setArt(content.data);
      });

    setShow(true);
    setSearchBar(true);
  };

  function handleChange(event) {
    const { value, name } = event.target;

    setStatus((prevValue) => {
      if (name === "content") {
        return {
          content: value,
          picture: prevValue.picture
        };
      } else if (name === "picture") {
        return {
          content: prevValue.content,
          picture: value
        };
      }
    });
  }

  function handleAdd() {
    setPost((prevStory) => [...prevStory, status]);
    setStatus({
      content: "",
      picture: ""
    });
    setShow(false);
    setSearchBar(false);
   
  }

  function handleDelete(id) {
    // console.log(id);
    setPost((prevPost) => {
      return prevPost.filter((post, index) => {
        return index !== id;
      });
    });
  }
  function selectGif(url) {
    const value = url;
    setStatus((prevItem) => {
      return {
        content: prevItem.content,
        picture: value
      };
    });
  }
  function handleSearch(event) {
    setWord(event.target.value);
  }

  function handleClose() {
    setShow(false);
    setSearchBar(false);
  }

  return (
    <>
      <div className="text-div">
        <textarea
          className="textarea"
          onChange={handleChange}
          name="content"
          value={status.content}
          placeholder="what's your status?"
        ></textarea> {status.picture !== ""  &&(
          <img
            className="text-img"
            src={status.picture}
            alt="alpha"
            name="picture"
            value={status.picture}
          />
        )}
      </div>
      <div>
        <button className="text-btn" onClick={handleAdd}>
          Add
        </button>
        <button className="text-btn" onClick={APIget}>
          Gif
        </button>
        
      </div>
      {post.map((item, index) => (
        <div className="post-div" key={index} id={index}>
          <p className="post-para">{item.content}</p>
       
          {item.picture !== "" && (
            <img className="post-img" src={item.picture} alt="beta" />
          )}
          <button
            className="post-btn"
            onClick={() => {
              handleDelete(index);
            }}
          >
            Delete
          </button>
        </div>
      ))}

      {searchBar && (
        <div>
          {" "}
          <input
            className="search-input"
            value={word}
            onChange={handleSearch}
            placeholder="search here"
          />
          <button className="text-btn" onClick={APIget}>
            Search
          </button>
          <button onClick={handleClose} className="search-btn">
            X
          </button>{" "}
        </div>
      )}

      {show && (
        <div className="gif-div">
          {art.map((item, index) => (
            <img
              className="gif-img"
              key={index}
              
              onClick={() => {
                selectGif(item.images.fixed_height.url);
              }}
              src={item.images.fixed_height.url}
              alt="gamma"
            />
          ))}
        </div>
      )}
    </>
  );
}

export default TextForm;
