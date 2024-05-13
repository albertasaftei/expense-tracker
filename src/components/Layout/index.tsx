import { Add, GridViewRounded, HomeRounded } from "@mui/icons-material";
import { Box, Fab, Grid } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCurrentFooterSection } from "src/appSlice";
import { AppDispatch, RootState } from "src/store";
import colors from "src/utils/colors";
import {
  TRANSACTIONS,
  HOMEPAGE,
  footerHeight,
  headerHeight,
} from "src/utils/constants";
import { routes } from "src/utils/routes";

interface LayoutProps {
  children: React.ReactNode;
  floatingButton?: boolean;
}

const Layout = ({ children, floatingButton }: LayoutProps) => {
  const currentFooterSection = useSelector(
    (state: RootState) => state.app.currentFooterSection
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    window.location.pathname === routes.homepage &&
      dispatch(setCurrentFooterSection(HOMEPAGE));

    window.location.pathname === routes.transactions &&
      dispatch(setCurrentFooterSection(TRANSACTIONS));
  }, []);

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
        Expenses Tracker
      </Box>
      <Box
        sx={{
          backgroundColor: colors.white,
          flex: 1,
          overflow: "auto",
          padding: "16px",
        }}
      >
        {children}
        {floatingButton && (
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
        )}
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
                navigate(routes.homepage);
              }}
              sx={{
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              <HomeRounded
                className="footer-icon"
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
                dispatch(setCurrentFooterSection(TRANSACTIONS));
                navigate(routes.transactions);
              }}
              sx={{
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              <GridViewRounded
                className="footer-icon"
                sx={{
                  color:
                    currentFooterSection === TRANSACTIONS
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
