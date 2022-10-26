import React from "react";
import { useHistory } from "react-router-dom";
import "./CreateProduct.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CreateNewProduct, image_post } from "../../redux/actions";
import swal from "sweetalert";
import {
  getCategorys, searchNameProduct,
} from "../../redux/actions";
import Swal from "sweetalert2";

// instalar sweetalert y usarla, crear nuevos inputs: talle, y stock

// validacion de errores
function validate(input) {
  let errores = {};
  let priceValidate;
  function isNumeric(value) {
    return /^-?\d+$/.test(value);
  }
  // for (let i = 0; i < input.price.length; i++) {
  //     let index = input.price.charAt(i)
  //     if(index>='0' && index<='9'){
  //         priceValidate = true
  //     } else {
  //         priceValidate = false
  //     }
  // }
  /*      NAME      */

  if (!input.name) {
    errores.name = "Name Product is required";
  } else if (input.name.length < 3) {
    errores.name = "The name must contain at least 3 letters";
  } else if (/^\s+$/.test(input.name)) {
    errores.name = "The name cannot be a blank space";
  } else if (!/^[a-zA-Z ]*$/.test(input.name)) {
    errores.name = "The name must only contain letters";
  } else if (input.name.startsWith(" ")) {
    errores.name = "Dont input blank spaces";
  } else if (input.name.endsWith(" ")) {
    errores.name = "Dont input blank space";
  } else if (input.price === null) {
    /*      PRICE         */
    errores.price = "The Price is required";
  } else if (input.price < 0) {
    errores.price = "The price must be a positive number";
  } else if (input.price.length === 0) {
    errores.price = "The Price is required";
  } else if (!isNumeric(input.price)) {
    errores.price = "The price must be a positive number";
  }

  // } else if (!input.image) {
  /*    IMG    */
  //   errores.image = "URL Image is required";
  // } else if (input.image.length < 5) {
  //   errores.image = "The URl must contain at least 5 letters";
  // } else if (/^\s+$/.test(input.image)) {
  //   errores.image = "The URL cannot be a blank space";
  // } else if (input.image.includes("https://")) {
  //   errores.image = "The URL must not contain the text 'https://'";
  // } else if (input.image.includes("http://")) {
  //   errores.image = "The URL must not contain the text 'http://'";
  // } else if (input.image.startsWith(" ")) {
  //   errores.image = "Dont input blank spaces";
  // } else if (input.image.endsWith(" ")) {
  //   errores.image = "Dont input blank space";}

  /*      DESCRIPTION      */

  else if (!input.description) {
    errores.description = "the description is required";
  } else if (input.description.length < 20) {
    errores.description = "The description must contain at least 20 letters";
  } else if (/^\s+$/.test(input.description)) {
    errores.description = "The description cannot be a blank space";
  } else if (input.description.startsWith(" ")) {
    errores.description = "Dont input blank spaces";
  } else if (input.description.endsWith(" ")) {
    errores.description = "Dont input blank space";
  }



  /*      SOTCK           */
  // else if (input.stock === 0) {
  //   errores.stock = "Stock is not 0";
  // }

  // else if (input.stock < 0) {
  //   errores.stock = "Stock is not less than 0";
  // }

  /*   GENDER     */
  // else if (input.gender === "Men" && input.categoryId === 8799 ||
  //     input.gender === "Men" && input.categoryId === 3630 ||
  //     input.gender === "Men" && input.categoryId === 9263 ||
  //     input.gender === "Men" && input.categoryId === 4169 ||
  //     input.gender === "Men" && input.categoryId === 2641) {
  //     errores.brand = "el genero elegido no tiene esa categoria, revisala de nuevo"
  // }

  // console.log(input.countries.length)
  return errores; // retornamos lo errores
}

function Formulario() {
  const [fileInputState, setFileInputState] = useState('');
  //const [previewSource, setPreviewSource] = useState('');
  const [selectedFile, setSelectedFile] = useState('');
  const dispatch = useDispatch();
  const categorys = useSelector((state) => state.categorys);
  const products = useSelector((state) => state.products);
  const [error, SetErrors] = useState({});
  const history = useHistory();
  const initialState = {
    id: Math.floor(Math.random() * 1000),
    name: "",
    price: "",
    image: "",
    gender: "",
    categoryId: undefined,
    NewCategory: "",
    BrandId: undefined,
    NewBrand: "",
    description: "",
    nameCategory: "Disable",
    nameBrand: "Disable",
    categorysGender: [],
    BrandOptions: [],
  };
  const [input, SetInput] = useState(initialState);

  // const previewFile = (file) => {
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onloadend = () => {
  //     setPreviewSource(reader.result);
  //   };
  // };

  function handleChange(e) {
    e.preventDefault();
    SetInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    SetErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }
  function imageHandleChange(e) {
    console.log(e.target.files[0])
    if (e.target.files[0].type === "image/png" || e.target.files[0].type === "image/jpeg" || e.target.files[0].type === "image/jpg") {

      const reader2 = new FileReader();
      reader2.readAsDataURL(e.target.files[0]);
      reader2.onloadend = () => {
        setFileInputState(reader2.result);
      }
      setSelectedFile(e.target.files[0]);

    } else {
      Swal.fire({
        title: "Insert valid image",
        showDenyButton: false,
        showCancelButton: false,
        confirmButtonText: "Ok",
        icon: "error"
      })
    }
  };


  function handleSelect(e) {
    dispatch(getCategorys());
    dispatch(searchNameProduct(""));
    let CategorysG = categorys.filter(element => element.gender === e.target.value);

    SetInput({
      ...input,
      categorysGender: CategorysG,
      gender: e.target.value,
      nameCategory: "Disable",
      BrandOptions: [],
      nameBrand: "Disable",
    });
  }

  function handleSelectCategory(e) {
    e.preventDefault();
    let id = e.target[e.target.selectedIndex].title
    let Brands = products.filter(element => element.gender == input.gender);
    Brands = Brands.filter(element => element.categoryId == id)
    Brands = obtenerMarcas(Brands)
    console.log(Brands)

    if (input.categoryId === "Create") {
      SetInput({
        ...input,
        categoryId: undefined,
        BrandOptions: [],
      })
    } else {
      SetInput({
        ...input,
        nameCategory: e.target.value,
        NewCategory: e.target.value,
        BrandOptions: Brands,
        nameBrand: "Disable",
        NewBrand: undefined,
      });
    }
  }


  function handleSelectBrand(e) {
    if (input.BrandId === "Create") {
      SetInput({
        ...input,
        BrandId: undefined,
      })
    } else {

      SetInput({
        ...input,
        nameBrand: e.target.value,
        NewBrand: e.target.value,
      });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!selectedFile || selectedFile == "") return;
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onload = () => {
      if (
        input.description &&
        input.name &&
        input.price &&
        selectedFile !== '' &&
        (input.nameBrand && input.nameBrand != "Disable") &&
        input.gender &&
        (input.nameCategory && input.nameCategory != "Disable")
      ) {
        dispatch(CreateNewProduct({
          name: input.name,
          price: input.price,
          brand: input.nameBrand,
          gender: input.gender,
          nameCategory: input.nameCategory,
          description: input.description,
          imageData: reader.result
        })).then(e => {
          var ID = e.data[0].id;
          swal({
            title: "Product created successfully!",
            icon: "success",
            button: "Ok",
          }).then(e => history.push(`/productEdit/${ID}`));
        }
        );
      }
      else alert(" missing data for the creation of a new product");
    }
  }
  //comprobacion de INPUT

  function comprobacionInput(input) {
    //console.log("entrar input comprobacion");
    console.log(fileInputState);
    console.log(selectedFile)
    if (
      input.name &&
      input.price &&
      //input.image &&
      (input.nameBrand && input.nameBrand != "Disable") &&
      input.gender &&
      (input.nameCategory && input.nameCategory != "Disable")
    ) {
      return true;
    } else {
      return false;
    }

  }

  //OBTENER MARCAS

  function obtenerMarcas(productosNuevos) {
    var Brands = [];
    for (let index = 0; index < productosNuevos.length; index++) {
      const element = productosNuevos[index].brand;
      if (!Brands.includes(element))
        Brands.push(element);
    }
    return Brands
  }

  // AUMENTAR STOCK

  function handleAumentar(e) {
    e.preventDefault();
    SetInput({
      ...input,
      stock: input.stock += 1
    });
    SetErrors(
      validate({
        ...input,
        stock: input.stock
      }));
  }

  // DISMINUIR STOCK

  function handleDecrementar(e) {
    e.preventDefault();
    SetInput({
      ...input,
      stock: input.stock -= 1
    });
    SetErrors(
      validate({
        ...input,
        stock: input.stock
      }))
  }

  //  TALLE 

  function handleSelectSize(e) {
    SetInput({
      ...input,
      size: e.target.value,
    });
  }

  //Create new categoria 

  function handleChangeCate(e) {
    e.preventDefault();
    SetInput({
      ...input,
      categoryId: e.target.value,
    });
  }

  function handleChangeBrand(e) {
    e.preventDefault();
    SetInput({
      ...input,
      BrandId: e.target.value,
    });
  }

  function CreateNewCategory(e) {
    e.preventDefault();
    input.categorysGender.push({
      id: 2341, // cambiar id por numero random o en la base de datos 
      name: input.categoryId,
      gender: input.gender
    });
    SetInput({
      ...input,
      NewCategory: "undefined",
      nameCategory: input.categoryId,
      categoryId: "",
    })
  }

  function CreateNewBrand(e) {
    e.preventDefault();
    input.BrandOptions.push(
      input.BrandId,
    );
    SetInput({
      ...input,
      NewBrand: "undefined",
      nameBrand: input.BrandId,
      BrandId: "",
    })
  }

  useEffect(() => {
    dispatch(getCategorys());
    dispatch(searchNameProduct(""));
    let CategorysG = categorys.filter(element => element.gender === input.gender);

    SetInput({
      ...input,
      categorysGender: CategorysG,
    });
  }, [dispatch]);


  console.log(input.categorysGender)
  console.log(input.BrandOptions)
  console.log(input.nameCategory)

  /*AQUI SE RENDERIZA*/

  return (
    < div className="containerCreate">
      {console.log(error)}
      <h2 className="titleCreate">Product creation</h2>
      <form className="formCreateProduct" onSubmit={(e) => handleSubmit(e)}>
        {fileInputState!=="" &&
        <div className="ContainerImageCreateProduct">
          <img  className="ImageCreateProductM" src={`${fileInputState}`} alt="Not found" ></img>
        </div>}
        <div className={input.name == "" ? "l__form__input-field" : "l__form__input-field2"}>
          {error.name && ( // si hay un error hara un <p> nuevo con el error
            <p className="error">{error.name}</p>
          )}
          <input
            type="text"
            value={input.name}
            className={input.name == "" ? "l__form__input-field" : "l__form__input-field2"}
            name="name"
            onChange={(e) => handleChange(e)}
          />
          <label className="label-form">Name</label>
        </div>
        <div className={input.price == "" ? "l__form__input-field" : "l__form__input-field2"}>
          {error.price && ( // si hay un error hara un <p> nuevo con el error
            <p className="error">{error.price}</p>
          )}
          <input
            type="number"
            min="0"
            step="25"
            className={input.price == "" ? "l__form__input-field" : "l__form__input-field2"}
            value={input.price}
            name="price"
            onChange={handleChange}
          />
          <label className="label-form">Price</label>
        </div>

        {/* <div> */}
        <input
          id="src-file1"
          type="file"
          name="image"
          onChange={imageHandleChange}
          className={input.image == "" ? "l__form__input-field file-select" : "l__form__input-field2 file-select"}
        />

        {/* <div /> */}
        {/* <div className={input.image=="" ? "l__form__input-field" : "l__form__input-field2" }>
            {error.image && ( // si hay un error hara un <p> nuevo con el error
              <p className="error">{error.image}</p>
              )}
            <input
              type="text"
              value={input.image}
              className={ input.image=="" ? "l__form__input-field" : "l__form__input-field2" }
              name="image"
              onChange={(e) => handleChange(e)}
            />
              <label className="label-form">Link Img:</label>
          </div> */}
        {/*<div>
            <p>brand:</p>
            {error.brand && ( // si hay un error hara un <p> nuevo con el error
              <p className="error">{error.brand}</p>
            )}
            <input
              type="text"
              value={input.brand}
              className="field"
              name="brand"
              onChange={(e) => handleChange(e)}
            />
          </div>*/}
        {/* </div> */}

        <div className="select">
          {/* {input.gender.length === 0 && ( // si hay un error hara un <p> nuevo con el error
            <p className="error">{"choose a gender"}</p>
          )} */}
          {/* <p className="SelectCreate">Select Gender:</p> */}
          <select className="select" onChange={(e) => handleSelect(e)}>
            <option selected disabled>
              Select Gender
            </option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
          </select>
        </div>
        <div>
          {/* <p className="SelectCreate">Select Category:</p> */}
          <div className="select">
            {input.categoryId === null && ( // si hay un error hara un <p> nuevo con el error
              <p className="error">{"choose a category"}</p>
            )}
            {/*<select
                className="select"
                onChange={(e) => handleSelectCategory(e)}
              >
                <option selected disabled>
                  Select Category
                </option>
                <option value="4208">Jeans</option>
                <option value="7078">Shorts</option>
                <option value="3602">Shirts</option>
                <option value="5668">Hoodies & Sweatshirts</option>
                <option value="14274">Sweatpants</option>
          </select>*/}

            <select value={input.nameCategory} className="select" onChange={(e) => handleSelectCategory(e)}>
              <option selected disabled value={"Disable"} title={"Disable"} > Select Category</option>
              {input.categorysGender.map((elemento) => {
                return (
                  <option key={elemento.id} value={elemento.name} title={elemento.id}>{elemento.name}</option>)
              })
              }
              {input.gender !== "" &&
                <option className="optionCreate" key={"Create"} value={"Create"} title={"Create"} >Create Category</option>}
            </select>
          </div>

          {/* CREAR NUEVA CATEGORY */}

          {input.NewCategory === "Create" && ( // si hay un error hara un <p> nuevo con el error
            <div className="containerCrate">
              <input
                type="text"
                value={input.categoryId}
                name="categoryId"
                className="fieldCreate"
                placeholder="New Category"
                onChange={(e) => handleChangeCate(e)}
              />
              <button className="btnAddCarry buttonCreateCategory" onClick={(e) => CreateNewCategory(e)}>Create category</button>
            </div>
          )}




          {/* <p className="SelectCreate">Select Brand:</p> */}
          <div className="select">
            {input.BrandId === null && ( // si hay un error hara un <p> nuevo con el error
              <p className="error">{"choose a brand"}</p>
            )}
            <select value={input.nameBrand} className="select" onChange={(e) => handleSelectBrand(e)}>
              <option selected disabled value={"Disable"} title={"Disable"} > Select Brand</option>
              {input.BrandOptions.map((elemento) => {
                return (
                  <option key={elemento} value={elemento} title={elemento}>{elemento}</option>)
              })
              }
              {input.nameCategory !== "Disable" && input.nameCategory !== "Create" &&
                <option className="optionCreate" key={"Create"} value={"Create"} title={"Create"} >Create Brand</option>}
            </select>
          </div>


          {input.NewBrand === "Create" && ( // si hay un error hara un <p> nuevo con el error
            <div className="containerCrate">
              <input
                type="text"
                value={input.BrandId}
                name="BrandId"
                className="fieldCreate"
                placeholder="New Brand"
                onChange={(e) => handleChangeBrand(e)}
              />
              <button className="btnAddCarry buttonCreateCategory" onClick={(e) => CreateNewBrand(e)}>Create Brand</button>
            </div>
          )}

          {/* DESCRIPTION */}
          <div className={input.description == "" ? "l__form__input-field" : "l__form__input-field2"}>
            {error.description && ( // si hay un error hara un <p> nuevo con el error
              <p className="error">{error.description}</p>
            )}
            <textarea
              id="txtCreate"
              name="description"
              value={input.description}
              onChange={(e) => handleChange(e)}
              className={input.description == "" ? "l__form__input-field" : "l__form__input-field2"}
              cols="30"
              rows="8">
            </textarea>
            <label className="label-formTxt">Description</label>
          </div>


          {/* STOCK */}
          {    /*
          <p className="stockTitle">Create Stock:</p>
          <div className="stockContainerPrincipal">
            <p className="stockNumberContain">stock Product:  <span className="stockNumber">{input.stock}</span></p>
            {error.stock && ( // si hay un error hara un <p> nuevo con el error
              <p className="error">{error.stock}</p>
            )}
            <section>
              <button className="buttonStock" onClick={(e) => handleAumentar(e)}>+</button>
              <button className="buttonStock" onClick={(e) => handleDecrementar(e)} >-</button>
            </section>
          </div>

          {/* TALLE */}
          {/*    
          <div className="select">
            {input.size.length === 0 && ( // si hay un error hara un <p> nuevo con el error
              <p className="error">{"choose a Size"}</p>
            )}
            <p>Select Size:</p>
            <select className="select" onChange={(e) => handleSelectSize(e)}>
              <option selected disabled>
                Select size
              </option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
            </select>
          </div>
                */}

          {/* BUTTON */}
          {Object.keys(error).length === 0 && comprobacionInput(input) ? (
            <button
              className="submit"
              type="submit"
              onClick={(e) => handleSubmit(e)}
            >
              Create New Product
            </button>
          ) : (
            <p className="todosCampos">
              You must fill in all the fields, to be able to Create your product
            </p>
          )}

          {/* <button className="submit" type='submit' onClick={(e) => handleSubmit(e)}>Create New Product</button> */}
        </div>
      </form>
    </div >
  );
}

export default Formulario;
