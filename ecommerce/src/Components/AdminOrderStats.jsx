import { useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Button,
  FormControl,
  InputGroup,
} from "react-bootstrap";

// activeProducts: 7539
// ​​
// deletedProducts: 4
// ​​
// processingProducts: 65
// ​​
// soldProducts: 1663
const AdminOrderStats = ({ stats }) => {
  useEffect(() => {
    console.log("loading stat", stats);
  }, [stats]);
  return (
    <Row className="mb-4">
      <Col>
        <Card className="text-center">
          <Card.Body>
            <Card.Title>Successfully delivered</Card.Title>
            <Card.Text className="text-success fs-2">
              {stats.deliveredNum}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card className="text-center">
          <Card.Body>
            <Card.Title>Processing</Card.Title>
            <Card.Text className="text-warning fs-2">
              {stats.processNum}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card className="text-center">
          <Card.Body>
            <Card.Title>Await Pickup</Card.Title>
            <Card.Text className="text-success fs-2">
              {stats.awaitNum}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card className="text-center">
          <Card.Body>
            <Card.Title>Cancelled</Card.Title>
            <Card.Text className="text-danger fs-2">
              {stats.cancelledNum}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};
export default AdminOrderStats;
