using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ASP_NET_Core.Models;

public class Category
{
    public int ID { get; set; }
    public int ParentID { get; set; }
    public string Name { get; set; }
}
