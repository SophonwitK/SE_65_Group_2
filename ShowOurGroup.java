public class ShowOurGroup {
    public static void main(String[] args){
        OurGroup og = new OurGroup();
        System.out.println("SE Group 2 Members");
        for (String name : og.getGroupMembers()) {
            System.out.println(name);
        }
	
	}
}
