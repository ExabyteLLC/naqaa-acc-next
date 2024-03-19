import { Col, Row } from "antd";

const MyGrid = ({ children, defaultSpan = 12, spacingX = 8, spacingY = 8 }) => {
 return (
    <Row gutter={[spacingX, spacingY]}>
      {children.map((child, index) => {
        const span = (function () {
          if (child.props.spanless) {
            return null;
          } else if (child.props.fullspan) {
            return 24;
          } else if (child.props.span) {
            return child.props.span;
          } else {
            return defaultSpan;
          }
        })();
        if (span) {
          return (
            <Col key={index} span={span}>
              {child}
            </Col>
          );
        } else {
          return child;
        }
      })}
    </Row>
  );
};
export default MyGrid;
