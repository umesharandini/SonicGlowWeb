import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const numbers = [1, 2, 3, 4, 5, 6, 7, 8];

const UserPattern = () => {
  const [grids, setGrids] = useState(
    Array.from({ length: 8 }, () =>
      Array(8).fill(null).map(() => Array(8).fill(false))
    )
  );

  const toggleCell = (gridIndex, row, col) => {
    const newGrids = [...grids];
    newGrids[gridIndex][row][col] = !newGrids[gridIndex][row][col];
    setGrids(newGrids);
  };

  const resetGrid = (gridIndex) => {
    const newGrids = [...grids];
    newGrids[gridIndex] = Array(8).fill(null).map(() => Array(8).fill(false));
    setGrids(newGrids);
  };

  const submitGrid = async (gridIndex) => {
    const activeCells = [];
    grids[gridIndex].forEach((row, y) => {
      row.forEach((active, x) => {
        if (active) activeCells.push({ x: x + 1, y: y + 1 });
      });
    });
    try {
      await axios.post('http://192.168.134.191:5080/set_pattern_custom', { pattern_data: activeCells }); // Changed to 8080
      console.log('Pattern sent:', activeCells);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="section6-wrapper">
      <header>
        <div className="logo">
          <h1>SonicGLow<br />Cube</h1>
        </div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/resources">Resources</Link></li>
            <li><Link to="/cube">SonicGlow Cube</Link></li>
            <li><Link to="/about">About Us</Link></li>
          </ul>
        </nav>
      </header>

      <main>
        <div className="section-title">Pattern</div>

        <div className="grid-container">
          {grids.map((grid, gIndex) => (
            <div className="pattern-block" key={gIndex}>
              <div className="grid" id={`grid-${gIndex}`}>
                <div className="label-col">
                  <div></div>
                  {letters.map(l => (
                    <div key={l}>{l}</div>
                  ))}
                </div>

                <div className="grid-body">
                  <div className="label-row">
                    <div></div>
                    {numbers.map(n => (
                      <div key={n}>{n}</div>
                    ))}
                  </div>
                  <div className="cells">
                    {grid.map((row, y) => (
                      <div className="grid-row" key={y}>
                        {row.map((isActive, x) => (
                          <div
                            key={x}
                            className={`cell ${isActive ? 'active' : ''}`}
                            onClick={() => toggleCell(gIndex, y, x)}
                          ></div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="front-label">Front {(gIndex + 1).toString().padStart(2, '0')}</div>

              <div className="button-group">
                <button onClick={() => resetGrid(gIndex)}>Reset</button>
                <button onClick={() => submitGrid(gIndex)}>Submit</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default UserPattern;