import java.util.Vector;

public class OurGroup{
    private Vector<String> groupMembers;
    public OurGroup(){
        groupMembers = new Vector<>();
        groupMembers.add("Sophonwit Kwanchai");
    }
    public Vector<String> getGroupMembers(){
        return groupMembers;
    }
}