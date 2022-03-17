import {
  IResourceComponentsProps,
  HttpError,
  useGetIdentity,
} from "@pankod/refine-core";

import {
  List,
  Table,
  Form,
  TextField,
  useTable,
  getDefaultSortOrder,
  Space,
  Button,
  EditButton,
  DeleteButton,
  ShowButton,
  SaveButton,
  NumberField,
  Select,
  useSelect,
  FilterDropdown,
  BooleanField,
  Card,
  useEditableTable,
} from "@pankod/refine-antd";

import {
  IBook,
  ILibrary,
  IBookFilterVariables,
  IReservation,
} from "interfaces";

import NormalizeData from "helpers/normalizeData";

import { useState } from "react";

export const BookList: React.FC<IResourceComponentsProps> = () => {
  const { data: currUser } = useGetIdentity();
  const [currRecordId, setCurrRecordId] = useState("");
  const { tableProps, sorter } = useTable<IBook, HttpError, IBookFilterVariables>({
    initialSorter: [
      {
        field: "id",
        order: "desc",
      },
    ],
    metaData: {
      populate: [
        "users_permissions_user",
        "library",
        "library.course",
        "library.course.school_year",
        "reservations",
        "reservations.users_permissions_user",
      ],
    },
    permanentFilter: [
      {
        field: "users_permissions_user.id",
        operator: "eq",
        value: currUser?.role !== "admin" ? currUser?.id : undefined,
      },
    ],
  });

  const {
    tableProps: reservationsTableProps,
    formProps,
    isEditing,
    setId: setEditId,
    saveButtonProps,
    cancelButtonProps,
    editButtonProps,
  } = useEditableTable<IReservation>({
    resource: "reservations",
    redirect: false,
    initialSorter: [
      {
        field: "id",
        order: "desc",
      },
    ],
    metaData: {
      populate: [
        "users_permissions_user",
        "book",
        "book.library",
        "book.users_permissions_user",
      ],
    },
    permanentFilter: [
      {
        field: "book.users_permissions_user.id",
        operator: "eq",
        value: currUser?.role !== "admin" ? currUser?.id : undefined,
      },
    ],
  });

  const { selectProps: librarySelectProps } = useSelect<ILibrary>({
    resource: "libraries",
  });

  const handleConfirmedReservations = (props: any) => {
    const  { currRecordId, reservationsIds } = props;
    reservationsIds
    .filter((reservationId: string) => reservationId !== currRecordId)
    .map((reservationId: string) => console.log(reservationId));
  }

  const renderReservations = (props: any) => {
    const { filteredReservationsTableProps: tableProps, reservationsIds } = props;
    return (
      <Form
        {...formProps}
        onFinish={(values: any) => {
          handleConfirmedReservations( { currRecordId, reservationsIds } );
          return formProps.onFinish?.({
            ...values,
          });
        }}
      >
        <Table
          {...tableProps}
          pagination={false}
          rowKey="id"
          onRow={(record) => ({
            onClick: (event: any) => {
              if (event.target.nodeName === "TD") {
                setEditId && setEditId(record.id);
              }
            },
          })}
        >
          <Table.Column
            dataIndex="id"
            key="id"
            title="ID"
            render={(value) => <TextField value={value} />}
          />
          <Table.Column
            key="[user][id]"
            dataIndex={["users_permissions_user", "data", "attributes", "username"]}
            title="User"
            sorter
          />
          <Table.Column
            key="comment"
            dataIndex="comment"
            title="Comment"
          />
          <Table.Column
            dataIndex="status"
            key="status"
            title="Status"
            render={(value, record: IReservation) => {
              if (isEditing(record.id)) {
                setCurrRecordId(record.id);
                return (
                  <Form.Item
                    name="status"
                    style={{ margin: 0 }}
                  >
                    <Select
                      defaultValue={value}
                      options={[
                        { label: "Proposed", value: "proposed" },
                        { label: "Confirmed", value: "confirmed" },
                        { label: "Rejected", value: "rejected" },
                      ]}
                    />
                  </Form.Item>
                );
              }
              return <TextField value={value} />;
            }}
            sorter
          />
          <Table.Column<IReservation>
            title="Actions"
            dataIndex="actions"
            render={(_, record) => {
              if (isEditing(record.id)) {
                return (
                  <Space>
                    <SaveButton
                      {...saveButtonProps}
                      hideText
                      size="small"
                    />
                    <Button
                      {...cancelButtonProps}
                      size="small"
                    >
                      Cancel
                    </Button>
                  </Space>
                );
              }
              return (
                <Space>
                  <EditButton
                    {...editButtonProps(record.id)}
                    hideText
                    size="small"
                    disabled={record.status === "interested"}
                  />
                </Space>
              );
            }}
          />
        </Table>
      </Form>
    )
  }

  return (
    <Card>
      <List>
        <Table
          {...tableProps} rowKey="id"
          expandable={{
            expandedRowRender: (record: { reservations: any; }) => {
              const reservationsIds = NormalizeData(record?.reservations).map((reservation: any) => reservation.id);
              const filteredReservationsTablePropsDS =
                reservationsTableProps.dataSource?.filter(
                  (reservation: IReservation) => reservationsIds.indexOf(reservation.id) !== -1
                );
              const filteredReservationsTableProps = { ...reservationsTableProps, dataSource: filteredReservationsTablePropsDS };
              return (
                <>
                  {renderReservations({ filteredReservationsTableProps, reservationsIds })}
                  {/*                     {
                      filteredReservationsTableProps,
                      formProps,
                      isEditing,
                      setEditId,
                      saveButtonProps,
                      cancelButtonProps,
                      editButtonProps,
                      currRecordId, setCurrRecordId,
                      reservationsIds,
                    }
                  )} */}
                </>
              )
            },
            rowExpandable: (record: { reservations: { data: { [s: string]: unknown; } | ArrayLike<unknown>; }; }) => Object.entries(record?.reservations.data).length > 0
          }}
        >
          <Table.Column
            dataIndex="id"
            key="id"
            title="ID"
            render={(value: any) => <TextField value={value} />}
            defaultSortOrder={getDefaultSortOrder("id", sorter)}
            sorter
          />
          <Table.Column
            key="[school_year][id]"
            dataIndex={["library", "data", "attributes", "course", "data", "attributes", "school_year", "data", "attributes", "title"]}
            title="School year"
            render={(value: any) => <TextField value={value} />}
          />
          <Table.Column
            key="[course][id]"
            dataIndex={["library", "data", "attributes", "course", "data", "attributes", "title"]}
            title="Course"
            render={(value: any) => <TextField value={value} />}
          />
          <Table.Column
            key="[library][id]"
            dataIndex={["library", "data", "attributes", "title"]}
            title="Title"
            sorter
            filterDropdown={(props: any) => (
              <FilterDropdown {...props}>
                <Select
                  allowClear
                  style={{ minWidth: 200 }}
                  mode="multiple"
                  placeholder="Select Title"
                  {...librarySelectProps}
                />
              </FilterDropdown>
            )}
          />
          <Table.Column
            key="is_available"
            dataIndex="is_available"
            title="Available"
            render={(value: any) => <BooleanField value={value} />}
            filterDropdown={(props: any) => (
              <FilterDropdown {...props}>
                <Select
                  placeholder="Select availability"
                  options={[
                    { label: "Available", value: "true" },
                    { label: "Not available", value: "false" },
                  ]}
                />
              </FilterDropdown>
            )}
          />
          {currUser?.role === "admin" && (
            <Table.Column
              key="[user][id]"
              dataIndex={["users_permissions_user", "data", "attributes", "username"]}
              title="Owner"
            />
          )}
          <Table.Column
            key="state"
            dataIndex="state"
            title="State"
            sorter
          />
          <Table.Column
            dataIndex="price"
            key="price"
            title="Price (€)"
            align="right"
            render={(value: any) => <NumberField value={value} />}
            defaultSortOrder={getDefaultSortOrder("title", sorter)}
            sorter
          />
          <Table.Column<IBook>
            title="Actions"
            dataIndex="actions"
            render={(_: any, record: { id: any; }) => (
              <Space>
                <ShowButton hideText size="small" recordItemId={record.id} />
                <EditButton hideText size="small" recordItemId={record.id} />
                <DeleteButton hideText size="small" recordItemId={record.id} />
              </Space>
            )}
          />
        </Table>
      </List>
    </Card>
  );
};