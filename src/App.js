import React from 'react';
// import './style.css';
import { useEffect, useState } from 'react';
import './App.css';

function Card({ obj, handleclick }) {
  let [data, setdata] = useState({});
  useEffect(() => {
    fetch(obj.url)
      .then((res) => res.json())
      .then((val) => {
        setdata(val[0]);
      });
  }, []);

  return (
    <>
      <div className={`thumb-container ${data.type}`}>
        <div className="number">{data.id}</div>
        {data.image ? (
          <img src={data.image} />
        ) : (
          <img src="https://images.freeimages.com/image/previews/922/sun-horse-ride-badge-png-5690216.png" />
        )}
        <h3>{obj.name}</h3>
        <small>Type: {data.type}</small>

        <button
          className={` ${data.type}`}
          onClick={() => {
            handleclick(data);
          }}
        >
          know more
        </button>
      </div>
    </>
  );
}

export default function App() {
  let [data, setdata] = useState([]);
  let [page, setpage] = useState();
  let [flag, setflag] = useState(false);
  let [detail, setdetail] = useState(null);
  let [url, seturl] = useState(
    `https://content.newtonschool.co/v1/pr/64ccef982071a9ad01d36ff6/pokemonspages1`
  );

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((val) => {
        let arr = val[0].results;
        setpage(val[0].next);
        console.log(page);
        setdata((prev) => {
          return [...prev, ...arr];
        });
      });
  }, [url]);
  function handleclick(data) {
    setdetail(data);
    setflag(!flag);
    console.log(data);
  }
  return (
    <>
      <div id="parent">
        <div id="section">
          <div className="content2">
            <h2>Pokemon </h2>
            <h2>Pokemon </h2>
          </div>
          <div className="content2">
            <h2> Kingdom</h2>
            <h2>Kingdom</h2>
          </div>
        </div>
        <div className="app-container">
          <div className="pokemon-container">
            <div className="all-container">
              {flag ? (
                <div className="opaquescreen ">
                  <div className={`expanded-overlay ${detail.type}`}>
                    <div className="expanded-left">
                      <img
                        className="expanded-image"
                        src={
                          detail.image
                            ? detail.image
                            : 'https://images.freeimages.com/image/previews/922/sun-horse-ride-badge-png-5690216.png'
                        }
                      />

                      <div className="expanded-name">
                        <h3>{detail.name ? detail.name : 'name'}</h3>
                      </div>
                    </div>
                    <div className={`expanded-description ${detail.type} `}>
                      <div className="expanded-right">
                        <div
                          style={{
                            margin: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          <div>
                            <h4>Weight:{detail.weight}</h4>
                            <h4>Height: {detail.height}</h4>
                          </div>
                        </div>
                        <button
                          className="close-button"
                          onClick={() => setflag(!flag)}
                        >
                          &times;
                        </button>

                        <table className="expanded-table">
                          {detail.stats.map((obj, index) => {
                            return (
                              <tr key={index}>
                                <td>stat{index + 1}:</td>
                                <td>{obj.stat.name}</td>
                              </tr>
                            );
                          })}
                        </table>
                        <table className="expanded-table">
                          {detail.stats.map((obj, index) => {
                            return (
                              <tr key={index}>
                                <td>Bs{index + 1}:</td>
                                <td>{obj.base_stat}</td>
                              </tr>
                            );
                          })}
                        </table>
                      </div>
                    </div>
                  </div>
                  67
                </div>
              ) : (
                ''
              )}
              {data.map((obj, index) => {
                return <Card key={index} obj={obj} handleclick={handleclick} />;
              })}
            </div>
            <button
              className="load-more"
              onClick={() => {
                seturl(page);
                console.log(page);
              }}
            >
              more pokemons
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
