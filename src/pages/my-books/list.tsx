import {
  IResourceComponentsProps,
  HttpError,
  useGetIdentity,
} from "@pankod/refine-core";

import {
  List,
  Table,
  TextField,
  useTable,
  getDefaultSortOrder,
  Space,
  EditButton,
  DeleteButton,
  ShowButton,
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

import { RenderReservations } from "components/customRenders";
import NormalizeData from "helpers/normalizeData";

import { useState } from "react";

export const MyBookList: React.FC<IResourceComponentsProps> = () => {
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
        field: "[users_permissions_user][id]",
        operator: "eq",
        value: 1, //currUser?.role !== "admin" ? currUser?.id : undefined,
      },
    ],
  });

  console.log('bookList tableProps: ', tableProps);

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
      filters: {
        book: {
          users_permission_user: {
            id: {
              $eq: 1, //currUser?.role !== "admin" ? currUser?.id : undefined,
            },
          },
        },
      },
    },
  });

  const { selectProps: librarySelectProps } = useSelect<ILibrary>({
    resource: "libraries",
  });

  return (
    <Card>
      <List>
        <Table
          {...tableProps} rowKey="id"
          expandable={{
            expandedRowRender: (record: { reservations: any; }) => {
              //console.log('test: ', Object.entries(record?.reservations).length);
              const reservationsIds = NormalizeData(record?.reservations).map((reservation: any) => reservation.id);
              const filteredReservationsTablePropsDS =
                reservationsTableProps.dataSource?.filter(
                  (reservation: IReservation) => reservationsIds.indexOf(reservation.id) !== -1
                );
              const filteredReservationsTableProps = { ...reservationsTableProps, dataSource: filteredReservationsTablePropsDS };
              return (
                <>
                  {RenderReservations(
                    {
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
                  )}
                </>
              )
            },
            rowExpandable: (record: { reservations: { [s: string]: unknown; } | ArrayLike<unknown>; }) => Object.entries(record?.reservations).length > 0          }}
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
            dataIndex={["library", "course", "school_year", "title"]}
            title="School year"
            render={(value: any) => <TextField value={value} />}
          />
          <Table.Column
            key="[course][id]"
            dataIndex={["library", "course", "title"]}
            title="Course"
            render={(value: any) => <TextField value={value} />}
          />
          <Table.Column
            key="[library][id]"
            dataIndex={["library", "title"]}
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
              dataIndex={["users_permissions_user", "username"]}
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