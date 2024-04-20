export const userColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "Khách",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img ||"https://cdn.icon-icons.com/icons2/1248/PNG/96/user_84308.png"} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "country",
    headerName: "Quốc Gia",
    width: 100,
  },
  {
    field: "city",
    headerName: "Thành phố",
    width: 100,
  },
  {
    field: "phone",
    headerName: "SĐT",
    width: 100,
  },
];
export const hotelColumns = [
  { field: "_id", headerName: "ID", width: 250},
  {
    field: "name",
    headerName: "Tên",
    width: 150,
  },
  {
    field: "type",
    headerName: "Loại",
    width: 100,
  },
  {
    field: "title",
    headerName: "Tiêu đề",
    width: 230,
  },
  {
    field: "city",
    headerName: "Thành Phố",
    width: 100,
  },
]

export const roomColumns = [
  { field: "_id", headerName: "ID", width: 70},
  {
    field: "title",
    headerName: "Tên",
    width: 230,
  },
  {
    field: "desc",
    headerName: "Mô tả",
    width: 200,
  },
  {
    field: "price",
    headerName: "Giá",
    width: 100,
  },
  {
    field: "maxPeople",
    headerName: "Sức chứa",
    width: 100,
  },
];


