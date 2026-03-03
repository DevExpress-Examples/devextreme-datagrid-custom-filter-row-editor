using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ASP_NET_Core.Models;
static class SampleData {
  public static List<Customer> Customers = new List<Customer>() {
    new Customer { ID = 1, CompanyName = "Super Mart of the West", IsActive = true, Zipcode = 72716, CategoryID = 2 },
    new Customer { ID = 2, CompanyName = "Electronics Depot", IsActive = false, Zipcode = 30339, CategoryID = 3 },
    new Customer { ID = 3, CompanyName = "K&S Music", IsActive = true, Zipcode = 55403, CategoryID = 3 },
    new Customer { ID = 4, CompanyName = "Tom's Club", IsActive = true, Zipcode = 98027, CategoryID = 5 },
    new Customer { ID = 5, CompanyName = "E-Mart", IsActive = false, Zipcode = 60179, CategoryID = 1 },
    new Customer { ID = 6, CompanyName = "Office Supplies Co", IsActive = true, Zipcode = 10001, CategoryID = 2 },
    new Customer { ID = 7, CompanyName = "Home Comforts", IsActive = false, Zipcode = 60601, CategoryID = 6 },
    new Customer { ID = 8, CompanyName = "Tech World", IsActive = true, Zipcode = 94016, CategoryID = 1 },
    new Customer { ID = 9, CompanyName = "Furniture Hub", IsActive = true, Zipcode = 75001, CategoryID = 4 },
    new Customer { ID = 10, CompanyName = "Mobile Express", IsActive = false, Zipcode = 33101, CategoryID = 3 }
  };
  public static List<Category> Categories = new List<Category>() {
    new Category { ID = 1, ParentID = 0, Name = "Electronics" },
    new Category { ID = 2, ParentID = 1, Name = "Laptops" },
    new Category { ID = 3, ParentID = 1, Name = "Phones" },
    new Category { ID = 4, ParentID = 0, Name = "Furniture" },
    new Category { ID = 5, ParentID = 4, Name = "Chairs" },
    new Category { ID = 6, ParentID = 4, Name = "Tables" }
  };
}
