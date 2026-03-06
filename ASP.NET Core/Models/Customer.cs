namespace ASP_NET_Core.Models;

public class Customer
{
  public int ID { get; set; }
  public string CompanyName { get; set; }
  public bool IsActive { get; set; }
  public int Zipcode { get; set; }
  public int CategoryID { get; set; }
}
