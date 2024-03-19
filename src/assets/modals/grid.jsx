import { Col, Row } from "antd";

const MyGrid = ({ children, defaultSpan = 12, spacingX = 8, spacingY = 8 }) => {
  return (
    <Row gutter={[spacingX, spacingY]}>
      {children.map((child, index) => {
        const span = (function () {
          if (child.props.fullSpan) {
            return 24;
          } else if (child.props.span) {
            return child.props.span;
          } else {
            return defaultSpan;
          }
        })();
        return (
          <Col key={index} span={span}>
            {child}
          </Col>
        );
      })}
    </Row>
  );
};
export default MyGrid;
