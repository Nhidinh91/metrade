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

const AdminOrderStats = ({
  stats,
  statusList,
  changeSellingStatus,
  totalItmes,
  displayAllOrderItem,
}) => {
  return (
    <Row className="mb-4">
      <Col>
        <Card className="text-center status-card" onClick={displayAllOrderItem}>
          <Card.Body>
            <Card.Title className="status-card-title">All</Card.Title>
            <Card.Text
              className="fs-2 status-card-text text-primary"
              style={{ color: `${displaySellingStatusColor(statusList[2])}` }}
            >
              {stats.allOrderNum}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card
          className="text-center status-card"
          onClick={() => changeSellingStatus(statusList[2])}
        >
          <Card.Body>
            <Card.Title className="status-card-title">
              Successfully delivered
            </Card.Title>
            <Card.Text
              className="fs-2 status-card-text"
              style={{ color: `${displaySellingStatusColor(statusList[2])}` }}
            >
              {stats.deliveredNum}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card
          className="text-center status-card"
          onClick={() => changeSellingStatus(statusList[0])}
        >
          <Card.Body>
            <Card.Title className="status-card-title">Processing</Card.Title>
            <Card.Text
              className="fs-2 status-card-text"
              style={{ color: `${displaySellingStatusColor(statusList[0])}` }}
            >
              {stats.processNum}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card
          className="text-center status-card"
          onClick={() => changeSellingStatus(statusList[1])}
        >
          <Card.Body>
            <Card.Title className="status-card-title">Await Pickup</Card.Title>
            <Card.Text
              className="fs-2 status-card-text"
              style={{ color: `${displaySellingStatusColor(statusList[1])}` }}
            >
              {stats.awaitNum}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card
          className="text-center status-card"
          onClick={() => changeSellingStatus(statusList[3])}
        >
          <Card.Body>
            <Card.Title className="status-card-title">Cancelled</Card.Title>
            <Card.Text
              className="fs-2 status-card-text"
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
