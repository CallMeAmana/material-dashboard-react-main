import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import Grid from "@mui/material/Grid";

export default function CourseCard(Props) {
  return (
    <>
      <Grid item xs={12} md={6} xl={3}>
        <DefaultProjectCard
          image={Props.image}
          title={Props.title}
          description={Props.desc}
          action={{
            type: "internal",
            route: "/dashboard/overview",
            color: "info",
            label: "Overview",
          }}
        />
      </Grid>
    </>
  );
}
