import { Add, GridViewRounded, HomeRounded } from "@mui/icons-material";
import { Box, Fab, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentFooterSection } from "src/appSlice";
import { RootState } from "src/store";
import colors from "src/utils/colors";
import {
  EXPENSES,
  HOMEPAGE,
  footerHeight,
  headerHeight,
} from "src/utils/constants";

const Layout = () => {
  const currentFooterSection = useSelector(
    (state: RootState) => state.app.currentFooterSection
  );
  const dispatch = useDispatch();

  console.log({ currentFooterSection });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100dvh",
        width: "100%",
      }}
    >
      <Box
        sx={{
          backgroundColor: colors.black,
          color: "white",
          height: headerHeight,
          display: "flex",
          alignItems: "center",
          paddingLeft: 3,
          fontSize: 20,
        }}
      >
        Expense Tracker
      </Box>
      <Box
        sx={{
          backgroundColor: colors.white,
          flex: 1,
          overflow: "auto",
        }}
      >
        <Box
          sx={{
            position: "fixed",
            bottom: footerHeight + 20,
            right: 20,
          }}
        >
          <Fab
            sx={{
              backgroundColor: colors.red,
              color: colors.white,

              "&:hover": {
                backgroundColor: colors.red,
                filter: "brightness(0.9)",
                transition: "0.3s ease-in-out",
              },
            }}
          >
            <Add />
          </Fab>
        </Box>
      </Box>
      <Box
        sx={{
          backgroundColor: colors.black,
          color: "white",
          height: footerHeight,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box
              onClick={() => {
                dispatch(setCurrentFooterSection(HOMEPAGE));
              }}
              sx={{
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              <HomeRounded
                sx={{
                  color:
                    currentFooterSection === HOMEPAGE
                      ? colors.red
                      : colors.white,
                  fontSize: 30,
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box
              onClick={() => {
                dispatch(setCurrentFooterSection(EXPENSES));
              }}
              sx={{
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              <GridViewRounded
                sx={{
                  color:
                    currentFooterSection === EXPENSES
                      ? colors.red
                      : colors.white,
                  fontSize: 30,
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Layout;
