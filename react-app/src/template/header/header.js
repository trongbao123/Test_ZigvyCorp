import React from "react";

const Header = () => {
  return (
    <div className="container-fluid " style={{ backgroundColor: "#040403" ,color:'white' }}>
      <nav class="navbar navbar-expand-lg navbar-dark container justify-content-between">
        <a class="navbar-brand" href="#">
          <img style={{width:70,height:50}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSdReLeTDjSn6-KVDiVMd4KJ7bE9TPxn82_g&usqp=CAU"/>
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="collapse navbar-collapse justify-content-center"
          id="navbarNavDropdown"
        >
          <ul class="navbar-nav">
            <li class="nav-item active">
              <a class="nav-link" href="#">
                Home <span class="sr-only">(current)</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Features
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Blog
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                News
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;
