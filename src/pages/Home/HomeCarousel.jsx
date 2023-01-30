import FavoriteIcon from "@mui/icons-material/Favorite";
import Carousel from "react-multi-carousel";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
  ButtonBase,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const HomeCarousel = (props) => {
  const navigate = useNavigate();
  return (
    <Carousel responsive={props.responsive} autoPlay={false} infinite={true}>
      {props.content?.data?.length ? (
        props.content.data.slice(0, 10).map((d, i) => (
          <div key={i} style={{ padding: "10px 15px 10px 0px" }}>
            <Card className="profile-card" elevation={1} sx={{ maxWidth: 345 }}>
              <ButtonBase
                className="profile-btn"
                onClick={() => navigate(`/auth/home/view-profile/${d.id}`)}
              >
                <CardMedia
                  component="img"
                  height="150"
                  image={d.image}
                  alt="Paella dish"
                />
                <CardHeader
                  action={
                    <IconButton
                      aria-label="settings"
                      onMouseDown={(event) => event.stopPropagation()}
                      onClick={(event) => {
                        event.stopPropagation();
                        event.preventDefault();
                        props.onClickLike(d);
                        console.log("Button clicked");
                      }}
                    >
                      <FavoriteIcon
                        style={{
                          color: d.is_liked ? "#D53833" : "rgba(0, 0, 0, 0.54)",
                        }}
                      />
                    </IconButton>
                  }
                  title={d.name}
                  titleTypographyProps={{ variant: "subtitle1" }}
                />
                <CardHeader
                  subheader={d.age + " yrs" + " " + d.education + " " + d.city}
                  subheaderTypographyProps={{ variant: "subtitle2" }}
                />
              </ButtonBase>
            </Card>
          </div>
        ))
      ) : (
        <Typography variant="h6" component="p" className="profile-no-record">
          No records found.
        </Typography>
      )}
    </Carousel>
  );
};

export default HomeCarousel;
