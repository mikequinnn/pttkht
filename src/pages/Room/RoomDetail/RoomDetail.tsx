import React, { useState, useEffect } from 'react'
import './RoomDetail.less'

import image1 from '../../../assets/images/SB-ATL-ZookHome-9-e1538165814448.jpg'
import image2 from '../../../assets/images/1.jpg'
import image3 from '../../../assets/images/2.jpg'
import image4 from '../../../assets/images/3.jpg'

const images = [image1, image2, image3, image4]
import avatar from '../../../assets/images/Avatar.jpg'

import { currencyConvert } from '../../../utils/convert'

import { getRoomById } from '../../../apis/RoomApi'

import UserLayout from '../../../layouts/UserLayout'

import dayjs from 'dayjs'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faExternalLinkAlt,
  faExclamation,
  faInfo,
  faUser,
  faHome,
  faCreditCard,
} from '@fortawesome/free-solid-svg-icons'

import { Row, Col, Image, Typography, Breadcrumb, Card, Button, Alert, Modal, Avatar } from 'antd'
import { Link } from 'react-router-dom'
import { PATH } from '../../../constants/path'

const { Title, Text, Paragraph } = Typography

const RoomDetail: React.FC = (props: any) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [room, setRoom] = useState<any>(null)
  const a = images[Math.floor(Math.random() * 4)]
  const getRoom = async () => {
    try {
      const response = await getRoomById(props.match.params.id)
      console.log(response.data)
      console.log(response.data.utilities)
      setRoom(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getRoom()
  }, [])

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  return (
    <UserLayout>
      {room != null && (
        <div className='room-detail-wrapper container'>
          <Image.PreviewGroup>
            <Row className='room-detail-image' align='middle' justify='center'>
              <Col span={12} style={{ width: '200%', overflow: 'hidden' }}>
                <Image src={room.imageUrl} />
              </Col>
              {/*<Col span={12}>*/}
              {/*  <Row gutter={[0, 0]}>*/}
              {/*    <Col span={12}>*/}
              {/*      <Image src={room.imageUrl} />*/}
              {/*    </Col>*/}
              {/*    <Col span={12}>*/}
              {/*      <Image src={room.imageUrl} />*/}
              {/*    </Col>*/}
              {/*  </Row>*/}
              {/*  <Row>*/}
              {/*    <Col span={12}>*/}
              {/*      <Image src={room.imageUrl} />*/}
              {/*    </Col>*/}
              {/*    <Col span={12}>*/}
              {/*      <Image src={room.imageUrl} />*/}
              {/*    </Col>*/}
              {/*  </Row>*/}
              {/*</Col>*/}
            </Row>
          </Image.PreviewGroup>

          <Row className='room-detail-title'>
            <Col span={18}>
              <Title level={3}>{room.roomInformation.name}</Title>
              <Breadcrumb>
                <Breadcrumb.Item>{room.roomAddress.city}</Breadcrumb.Item>
                <Breadcrumb.Item>
                  <a href=''>{room.roomAddress.district}</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>{room.roomAddress.streetName}</Breadcrumb.Item>
              </Breadcrumb>
            </Col>
            <Row>
              <Col span={6} style={{ textAlign: 'right' }}>
                <div style={{ display: 'flex' }}>
                  <Button
                    className='button'
                    type='primary'
                    size='large'
                    icon={<FontAwesomeIcon icon={faCreditCard} />}
                    onClick={showModal}
                  >
                    <Link to={PATH.ROOM.PAY} style={{ color: 'white' }}>
                      ?????t ph??ng
                    </Link>
                  </Button>
                  <Button
                    type='primary'
                    size='large'
                    icon={<FontAwesomeIcon icon={faExternalLinkAlt} />}
                    onClick={showModal}
                  >
                    Chia s???
                  </Button>
                </div>
              </Col>
              {/* <Col span={6} style={{ textAlign: 'right' }}> */}
              {/* <Modal title='Chia s???' visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
                  <Title level={5} style={{ textAlign: 'center' }}>
                    {room.roomInformation.name}
                  </Title>
                  <Text style={{ fontSize: '12px', color: '#666666' }}>LI??N K???T</Text>
                  <br />
                  <Text>{window.location.href}</Text>
                </Modal> */}
              {/* </Col> */}
            </Row>
          </Row>

          <Row className='room-detail-information' gutter={24}>
            <Col span={16} className='room-information'>
              <Card>
                <Title level={4}>
                  <FontAwesomeIcon icon={faHome} style={{ color: '#3b82f6' }} />
                  Th??ng tin ph??ng
                </Title>
                <Row style={{ marginTop: '24px' }}>
                  <Col span={6}>
                    <div className='room-information-title'>gi?? ph??ng</div>
                    <div>
                      {currencyConvert(room.roomExpense.rentalPrice).price}{' '}
                      {currencyConvert(room.roomExpense.rentalPrice).unit} ?????ng
                    </div>
                  </Col>
                  <Col span={6}>
                    <div className='room-information-title'>di???n t??ch</div>
                    <div>{room.roomInformation.roomArea} m??t vu??ng</div>
                  </Col>
                  <Col span={6}>
                    <div className='room-information-title'>?????t c???c</div>
                    <div>
                      {currencyConvert(room.roomExpense.deposit).price} {currencyConvert(room.roomExpense.deposit).unit}{' '}
                      ?????ng
                    </div>
                  </Col>
                  <Col span={6}>
                    <div className='room-information-title'>s???c ch???a</div>
                    <div>
                      {room.roomInformation.roomCapacity} {room.roomInformation.gender == 1 && 'NAM ho???c N???'}{' '}
                      {room.roomInformation.gender == 2 && 'NAM'} {room.roomInformation.gender == 3 && 'N???'}
                    </div>
                  </Col>
                </Row>
                <Row style={{ marginTop: '24px' }}>
                  <Col span={6}>
                    <div className='room-information-title'>ng??y ????ng</div>
                    <div>{dayjs(room.createdAt).format('DD-MM-YYYY')}</div>
                  </Col>
                  <Col span={6}>
                    <div className='room-information-title'>tr???ng th??i</div>
                    <div className='room-status'>C??n ph??ng</div>
                  </Col>
                  <Col span={6}>
                    <div className='room-information-title'>x??c th???c</div>
                    <div className='room-status' style={{ color: room.admin ? '#1edb4c' : 'red' }}>
                      {room.admin ? '???? ???????c x??c th???c' : 'Ch??a ???????c x??c th???c'}
                    </div>
                  </Col>
                </Row>
                <Row style={{ marginTop: '24px' }}>
                  <Col span={24}>
                    <div className='room-information-title'>?????a ch???</div>
                    <div>
                      S??? {room.roomAddress.houseNumber}&nbsp;
                      {room.roomAddress.streetName},&nbsp;
                      {room.roomAddress.ward},&nbsp;
                      {room.roomAddress.district},&nbsp;
                      {room.roomAddress.city}
                    </div>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col span={8} className='user-information'>
              <Card>
                <Title level={4}>
                  <FontAwesomeIcon icon={faUser} style={{ color: '#4877F7' }} />
                  Th??ng tin ch??? ph??ng
                </Title>
                <Row>
                  <Col span={5}>
                    <Avatar size={64}>{room.user.info.lastName.charAt(0)}</Avatar>
                  </Col>
                  <Col span={19}>
                    <div>
                      <span style={{ fontWeight: 'bold' }}>
                        {room.user.info.lastName} {room.user.info.firstName}
                      </span>
                    </div>
                    <div>
                      <span>{room.user.info.phone}</span>
                    </div>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>

          <Row className='room-detail-utility' gutter={24}>
            <Col span={16}>
              <Card>
                <Title level={4}>Ti???n ??ch</Title>
                <Row wrap gutter={[0, 12]}>
                  {room.utilities.map((element: any, index: any) => {
                    return (
                      <Col span={6} key={index}>
                        <Text>{element.name}</Text>
                      </Col>
                    )
                  })}
                </Row>
              </Card>
            </Col>
          </Row>

          <Row className='room-detail-note' gutter={24}>
            <Col span={16}>
              <Card>
                <Title level={4}>
                  <FontAwesomeIcon icon={faExclamation} style={{ color: '#E64926' }} />
                  L??u ??
                </Title>
                <Text style={{ fontSize: '20px' }}>S???c ch???a</Text>
                {room.roomInformation.roomCapacity != 1 ? (
                  <Row gutter={14}>
                    <Col span={8}>
                      <div className='room-detail-note-title'>R???ng</div>
                      <Alert
                        message={`${room.roomInformation.roomCapacity - 1} ng?????i`}
                        type='success'
                        style={{ textAlign: 'center' }}
                      />
                    </Col>
                    <Col span={8}>
                      <div className='room-detail-note-title'>V???a</div>
                      <Alert
                        message={`${room.roomInformation.roomCapacity} ng?????i`}
                        type='warning'
                        style={{ textAlign: 'center' }}
                      />
                    </Col>
                    <Col span={8}>
                      <div className='room-detail-note-title'>Ch???t</div>
                      <Alert
                        message={`${room.roomInformation.roomCapacity + 1} ng?????i +`}
                        type='error'
                        style={{ textAlign: 'center' }}
                      />
                    </Col>
                  </Row>
                ) : (
                  <Row gutter={14}>
                    <Col span={12}>
                      <div className='room-detail-note-title'>V???a</div>
                      <Alert
                        message={`${room.roomInformation.roomCapacity} ng?????i`}
                        type='warning'
                        style={{ textAlign: 'center' }}
                      />
                    </Col>
                    <Col span={12}>
                      <div className='room-detail-note-title'>Ch???t</div>
                      <Alert
                        message={`${room.roomInformation.roomCapacity + 1} ng?????i +`}
                        type='error'
                        style={{ textAlign: 'center' }}
                      />
                    </Col>
                  </Row>
                )}
              </Card>
            </Col>
          </Row>

          <Row className='room-detail-description' gutter={24}>
            <Col span={16}>
              <Card>
                <Title level={4}>
                  <FontAwesomeIcon icon={faInfo} style={{ color: '#8B572A' }} />
                  M?? t??? th??m
                </Title>
                <Paragraph>{room.roomInformation.description}</Paragraph>
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </UserLayout>
  )
}

export default RoomDetail
