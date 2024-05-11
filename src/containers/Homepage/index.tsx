import { Box, Typography } from "@mui/material";
import { Card, Column, Layout, Row, Strip } from "src/components";
import colors from "src/utils/colors";

const Homepage: React.FC = () => {
  return (
    <Layout>
      <Box
        className="Wrapper"
        sx={{
          margin: "32px 16px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: "16px",
            justifyContent: "center",
          }}
        >
          <Card
            mainText="- $1000"
            upperDescription="Spent this month >"
            backgroundColor={colors.lightRed}
          />
          <Card
            mainText="+ $1000"
            upperDescription="Earned this month >"
            backgroundColor={colors.lightGreen}
          />
        </Box>
        <Box
          sx={{
            margin: "32px 0px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Row
            sx={{
              justifyContent: "space-between",
              marginBottom: "16px",
            }}
          >
            <Typography
              sx={{
                fontSize: "14px",
              }}
            >
              Last 10 transactions:
            </Typography>
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "14px",
                textTransform: "uppercase",
                color: colors.red,
              }}
            >
              View all
            </Typography>
          </Row>

          <Column
            sx={{
              gap: "16px",
            }}
          >
            {[...Array(10)].map((_) => (
              <Strip
                left={
                  <Typography fontWeight={500} color={colors.red}>
                    - 70$
                  </Typography>
                }
              />
            ))}
          </Column>
        </Box>
      </Box>
    </Layout>
  );
};

export default Homepage;
