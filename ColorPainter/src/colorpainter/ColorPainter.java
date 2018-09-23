package colorpainter;

import java.awt.Color;
import java.awt.FlowLayout;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.awt.event.MouseMotionListener;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JPanel;


public class ColorPainter {
	


	public static void main(String[] args){
		JFrame frame = new JFrame("ColorPainter");
			frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
			frame.setSize(600,400);
			frame.setLocationRelativeTo(null);
			frame.setVisible(true);
		
		JFrame frame2 = new JFrame("Color");
			frame2.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
			frame2.setSize(400,100);
			frame2.setLocation(700,800);
			frame2.setVisible(true);
			frame2.setLayout(new FlowLayout());
			
			
		JButton button1 = new JButton("RED");
		JButton button2 = new JButton("BLUE");
		JButton button3 = new JButton("YELLOW");
		JButton button4 = new JButton("GREEN");
		
		
		
		
		frame2.add(button1);
		frame2.add(button2);
		frame2.add(button3);
		frame2.add(button4);
			
		
		Canvas canvas = new Canvas();
		frame.add(canvas);
			
		
		
		
		button2.addActionListener(e ->{
			Pushblue pushblue = new Pushblue();
		});
		
		
	}

}


class Canvas extends JPanel implements MouseListener,MouseMotionListener{
	private int x = -100;
	private int y = -100;
	
	
	public Canvas(){
		addMouseMotionListener(this);
		addMouseListener(this);
		setSize(600,400);
	}
	
	@Override
	public void paintComponent(Graphics g){
		g.setColor(Color.RED);
		g.fillOval(x-5, y-5, 10, 10);
	}
	
	@Override
		public void mouseClicked(MouseEvent e){
		
	}
	
	@Override
		public void mousePressed(MouseEvent e){
		x = e.getX();
		y = e.getY();
		repaint();
	}
	
	@Override
		public void mouseReleased(MouseEvent e){
	
	}
	
	@Override
		public void mouseEntered(MouseEvent e){
	
	}
	
	
	@Override
		public void mouseExited(MouseEvent e){
	
	}
	
	
	@Override
		public void mouseDragged(MouseEvent e){
		x = e.getX();
		y = e.getY();
		repaint();
	}
	
	@Override
		public void mouseMoved(MouseEvent e){
		
	}
	
}


class Pushblue extends JPanel{
	
	public void Pushblue(){
		
		setSize(400,100);
	}
		

	public void changeblue(Graphics2D g2d){
		g2d.setColor(Color.BLUE);
		
		
	}
	
	
	
	
	
}






