import { useState } from "react";
import "../../styles/product.css";

import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Divider } from "@mui/material";
import Grid from "@mui/material/Grid2";

import ProductCard from "../../components/ProductCard";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { SearchBox, TablePagination } from "../../components/BasicComponents";

function ProductList(props) {
  const { setOpenSnack, setSnackData } = props;
  const navigate = useNavigate();

  const [search,setSearch] =useState("")

  const handleSearch = (e) =>{
    if(e){
      setSearch(e.target.value)
    }
  }

  const [page, setPage] = useState(1);
  const [total_count, settotal_count] = useState(1);
  const handleChangePage = (e, v) => {
    setPage(v);
  };

  const [state, setState] = useState({
    data: [],
  });

  const navigate_to_view = (id) => {
    navigate("/product-view/", { state: { id: id } });
  };

  const fetchData = async () => {
    try {
      const response = await api.get(`/api/product/?page=${page}&search=${search}`);
      if (response.status === 200) {
        setState({ ...state, data: response.data.results });
        settotal_count(response.data.count);
      }
    } catch (error) {
      // console.error("Error fetching data:", error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, [page,search]);

  return (
    <div>
      {/* heading */}
      <h2 className="center-text">{/* Product list */}</h2>

      {/* ===========prodcut list======== */}
      <React.Fragment>
        <CssBaseline />
        <Container fixed >


          <Box sx={{ flexGrow: 1 }}>
          <SearchBox handleChange={handleSearch} />


            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >

              {state.data.map((item, index) => (
                <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
                  <ProductCard
                    id={item.id}
                    image={item.product_images[0].image}
                    title={item.title}
                    price={item.price}
                    originalPrice={item.original_price}
                    discount={item.discount}
                    rating={item.rating}
                    onclick_fun={navigate_to_view}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
          <Divider sx={{ marginBottom: 3 }} />
          <div className="pagination-div">
            <TablePagination
              sx={{ marginBottom: 3 }}
              total_count={total_count}
              page={page}
              onChange={handleChangePage}
            />
          </div>
        </Container>
      </React.Fragment>
    </div>
  );
}

export default ProductList;
