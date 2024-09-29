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

import { displaySellingStatusColor } from "../utils/transactionUtils";

// activeProducts: 7539
// ​​
// deletedProducts: 4
// ​​
// processingProducts: 65
// ​​
// soldProducts: 1663
const AdminOrderStats = ({ stats, statusList, changeSellingStatus }) => {
  return (
    <Row className="mb-4">
      <Col>
        <Card
          className="text-center card-order-item"
          onClick={() => changeSellingStatus(statusList[2])}
        >
          <Card.Body>
            <Card.Title>Successfully delivered</Card.Title>
            <Card.Text
              className="fs-2"
              style={{ color: `${displaySellingStatusColor(statusList[2])}` }}
            >
              {stats.deliveredNum}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card
          className="text-center card-order-item"
          onClick={() => changeSellingStatus(statusList[0])}
        >
          <Card.Body>
            <Card.Title>Processing</Card.Title>
            <Card.Text
              className="fs-2"
              style={{ color: `${displaySellingStatusColor(statusList[0])}` }}
            >
              {stats.processNum}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card
          className="text-center card-order-item"
          onClick={() => changeSellingStatus(statusList[1])}
        >
          <Card.Body>
            <Card.Title>Await Pickup</Card.Title>
            <Card.Text
              className="fs-2 "
              style={{ color: `${displaySellingStatusColor(statusList[1])}` }}
            >
              {stats.awaitNum}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card
          className="text-center card-order-item"
          onClick={() => changeSellingStatus(statusList[3])}
        >
          <Card.Body>
            <Card.Title>Cancelled</Card.Title>
            <Card.Text
              className="fs-2"
              style={{ color: `${displaySellingStatusColor(statusList[3])}` }}
            >
              {stats.cancelledNum}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};
export default AdminOrderStats;
